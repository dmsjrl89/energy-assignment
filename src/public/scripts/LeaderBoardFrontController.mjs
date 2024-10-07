export class LeaderBoardFrontController {

  static data = null

  static setData(data) {
    this.data = data
  }


  static async init() {
    await this.renderLeaderBoard(); // 페이지 로드 시 리더보드 렌더링
  }



  static async renderLeaderBoard() {
    try {
      const response = await fetch('/leaderBoard'); // 리더보드 데이터를 가져오는 API 호출
      const text = await response.text();
      console.log('Response Text:', text); // 서버에서 반환된 텍스트 확인

      const leaderboardData = JSON.parse(text); // JSON으로 변환

      this.setData(leaderboardData)

      console.log(this.data)

      const leaderboardDiv = document.getElementById('leaderboard');
      leaderboardDiv.innerHTML = ''; // 이전 내용을 지우기

      // 테이블 생성
      const table = document.createElement('table');
      table.classList.add('leaderboard-table');

      // 테이블 헤더 생성
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
            <th>State</th>
            <th>Wind</th>
            <th>Solar</th>
            <th>Gas</th>
            <th>Coal</th>
            <th>Action</th>
        `;
      table.appendChild(headerRow);

      // 데이터 렌더링
      leaderboardData.forEach(entryArray => {
        entryArray.forEach(entry => { // 중첩된 배열을 순회
          if (entry.energyPerSourceArray && Array.isArray(entry.energyPerSourceArray)) {
            entry.energyPerSourceArray.forEach((sourceData, index) => {
              const row = document.createElement('tr'); // 새로운 테이블 행 생성
              row.innerHTML = `
                            <td>${entry.state}</td>
                            <td>${sourceData.wind}</td>
                            <td>${sourceData.solar}</td>
                            <td>${sourceData.gas}</td>
                            <td>${sourceData.coal}</td>
<button onclick="LeaderBoardFrontController.handleDeleteEnergyPerSource('${entry.id}','${entry.state}', ${index})">Delete</button> `;
              table.appendChild(row); // 테이블에 행 추가
            });
          } else {
            const row = document.createElement('tr');
            row.innerHTML = `
                        <td>${entry.state}</td>
                        <td colspan="5">No energy data available.</td>
                    `;
            table.appendChild(row);
          }
        });
      });

      leaderboardDiv.appendChild(table); // 테이블을 leaderboardDiv에 추가
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }

  }


  static async deleteEnergyPerSourceByIndex(id) {
    console.log('Deleting entry with ID:', id);
    try {
      const response = await fetch(`/leaderBoard/leaderBoardPost/${id}`, {
        method: 'DELETE',
      });

      console.log('Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text(); // 서버에서 반환된 메시지 읽기
        throw new Error(`Failed to delete entry: ${errorText}`);
      }

      console.log('Entry deleted successfully');

      // 삭제 후 리더보드 다시 렌더링
      await this.renderLeaderBoard();


    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  }



    static deleteEnergyPerSourceByIndex(entryId, arrayIndex) {
      // entryId에 해당하는 entry를 찾아서
      const entry = this.data.find(entryArray => 
        entryArray.some(entry => entry.id === entryId)
      )?.find(entry => entry.id === entryId); // entry를 찾고
  
      if (!entry) {
          console.error('Entry not found with ID:', entryId);
          return; // entry가 없으면 함수 종료
      }
  
      // entry의 energyPerSourceArray를 가져옵니다
      const energyPerSourceArray = entry.energyPerSourceArray;
  
      // 필터링하여 인덱스가 arrayIndex와 다른 요소만 남긴 새로운 배열 반환
      const updatedArray = energyPerSourceArray.filter((_, index) => index !== arrayIndex);
      
      console.log('Updated energyPerSourceArray:', updatedArray);
      return updatedArray; // 업데이트된 배열 반환
  }
  

static handleDeleteEnergyPerSource(entryId, state, arrayIndex) {
 let energyPerSourceArray = this.deleteEnergyPerSourceByIndex(entryId, arrayIndex)
  const body =  {
    entryId,
    state,
    energyPerSourceArray
  }

  fetch("/leaderBoard/leaderBoardPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),


  }).then((response) => {
    if (response.status == 200) {
      console.log(response.status)
      window.location = "/views/leaderboard.html"
    } else {
      alert("Error submitting order - status: " + response.status);
    }
  });
}





  static async addLeaderBoardEntry(locationData) {
    try {
      const response = await fetch('/leaderBoard/leaderBoardPost', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationData), // 클라이언트에서 보낸 데이터
      });

      if (response.ok) {
        // 성공적으로 데이터가 추가되면 리더보드를 다시 로드
        await this.renderLeaderBoard();
      } else {
        console.error('Failed to add leaderboard entry:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting leaderboard data:', error);
    }
  }
}
window.addEventListener('DOMContentLoaded', () => {
  LeaderBoardFrontController.init();
});

window.LeaderBoardFrontController = LeaderBoardFrontController;