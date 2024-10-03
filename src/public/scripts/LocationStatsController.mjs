import { LocationModel } from "./LocationModel.mjs";

export class LocationStatsController {
  static locationId = "";
  static applianceLists = [];

  static {
    // Post button event
    document
      .getElementById("post-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.sendStatic();
      });
    //Setup event listeners here
    document.getElementById("back-button").addEventListener("click", () => {
      this.backButton();
    });

    // Trigger initial load and render here
    this.renderLocationName();
    // this.postStaticsLeaderBoard();
  }

  // post event

  static backButton() {
    window.location = "/views/location_list.html";
  }

  static async renderEnergyperSource(stateName) {
    try {
      const response = await fetch("/location/locationStaticsRoutes");
      const nationalSources = await response.json();
      const nationalSource = nationalSources.find((e) => e.state == stateName);
      return nationalSource;
    } catch (error) {
      console.error("Failed to load appliances:", error);
    }
  }

  static async renderLocationName() {
    // 이전 페이지에서 저장한 location ID 가져오기
    const locationId = localStorage.getItem("selectedLocationId");

    if (locationId) {
      const location = LocationModel.getById(locationId);

      if (location) {
        const locationRenderList = document.getElementById(
          "location-stats-name"
        );
        locationRenderList.innerHTML = "";

        const applianceItem = document.createElement("li");

        const locationStatsName = document.createElement("p");
        locationStatsName.innerText = "Location Name: " + location.name;
        applianceItem.appendChild(locationStatsName);

        locationRenderList.appendChild(applianceItem);

        // const locationStatsWatts = document.createElement("p");
        // locationStatsWatts.innerText = JSON.stringify(
        //   await this.calculateEnergyPerSource(locationId)
        // );
        // applianceItem.appendChild(locationStatsWatts);

        // locationRenderList.appendChild(applianceItem);

        const locationStatsWatts = document.createElement("div");
        // Use the calculateEnergyPerSource method and pass locationId to get energy source data
        const energyPerSourceArray = await this.calculateEnergyPerSource(
          locationId
        );
        // to-do: refactoring - function
        // Initialize totals for each energy source
        let totalWind = 0;
        let totalSolar = 0;
        let totalGas = 0;
        let totalCoal = 0;

        // Sum up the energy from all appliances
        energyPerSourceArray.forEach((energyPerSource) => {
          totalWind += energyPerSource.wind;
          totalSolar += energyPerSource.solar;
          totalGas += energyPerSource.gas;
          totalCoal += energyPerSource.coal;
        });

        // Prepare the data
        const data = {
          labels: ["Wind", "Solar", "Gas", "Coal"],
          datasets: [
            {
              label: "Energy Consumption (watts)",
              data: [totalWind, totalSolar, totalGas, totalCoal],
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)", // Wind color
                "rgba(255, 205, 86, 0.2)", // Solar color
                "rgba(54, 162, 235, 0.2)", // Gas color
                "rgba(255, 99, 132, 0.2)", // Coal color
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 205, 86, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };

        // Create the chart
        const ctx = document.getElementById("energyChart").getContext("2d");
        const energyChart = new Chart(ctx, {
          type: "bar", // Type of chart
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        // Create an unordered list element to display the totals
        const ulElement = document.createElement("ul");

        const windLi = document.createElement("li");
        windLi.innerText = `Wind: ${totalWind} watts`;
        ulElement.appendChild(windLi);

        const solarLi = document.createElement("li");
        solarLi.innerText = `Solar: ${totalSolar} watts`;
        ulElement.appendChild(solarLi);

        const gasLi = document.createElement("li");
        gasLi.innerText = `Gas: ${totalGas} watts`;
        ulElement.appendChild(gasLi);

        const coalLi = document.createElement("li");
        coalLi.innerText = `Coal: ${totalCoal} watts`;
        ulElement.appendChild(coalLi);
        // Append the list to the appliance item
        applianceItem.appendChild(ulElement);
        locationRenderList.appendChild(applianceItem);

        //   const stateName = location.state;  // state 값을 location에서 가져옴
        //   const locationData = {
        //       state: stateName,  // state 값 추가
        //       wind: totalWind,
        //       solar: totalSolar,
        //       gas: totalGas,
        //       coal: totalCoal
        //   };

        //   // 서버로 POST 요청
        //  this.postStaticsLeaderBoard(locationData);
      }
    }
  }

  static renderEnergyList(calculateEnergyPerSource) {
    const energyListElement = document.getElementById("location-stats-name");
    energyListElement.innerHTML = `
    Energy consumed per energy source:
    <ul>
      <li>wind: ${calculateEnergyPerSource.wind} </li>
      <li>solar: ${calculateEnergyPerSource.solar}</li>
      <li>gas: ${calculateEnergyPerSource.gas}</li>
      <li>coal: ${calculateEnergyPerSource.coal}</li>
    `;
  }

  // example: this.calculateEnergyPerSource("Home");
  static async calculateEnergyPerSource(locationId) {
    let results = [];

    // get all the appliances information with id in localstorage
    const locationNameArray = LocationModel.getById(locationId);

    // appliance array
    let appliances = locationNameArray["appliances"];

    // bring the state name
    const stateName = locationNameArray.state;
    const nationalSources = await this.renderEnergyperSource(stateName);

    //calculate watts with each source
    appliances.forEach((appliance) =>
      results.push(this.nameByEnergySource(appliance.watts, nationalSources))
    );
    return results;
  }

  static nameByEnergySource(watts, nationalSource) {
    let result = {};
    let totalEnergy = 0;
    totalEnergy += parseInt(watts);
    result = {
      wind: totalEnergy * (Number(nationalSource.wind) / 100),
      solar: totalEnergy * (Number(nationalSource.solar) / 100),
      gas: totalEnergy * (Number(nationalSource.gas) / 100),
      coal: totalEnergy * (Number(nationalSource.coal) / 100),
    };

    return result;
  }

  // post stats to leader board(post fetch) and go to leader board.
  static postStaticsLeaderBoard() {

    const location = this.renderLocationName();

    fetch("/location/leaderBoardPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    })
      .then((response) => {
        if (!response.ok) {
          
          // response.ok는 200-299 범위의 상태 코드를 의미
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        else
          window.location = "/views/leaderboard.html";
        return response.json();
      })
      .then((location) => {
        console.log("Success:", location);
        
        // window.location = "/views/leaderboard.html";

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // post 데이터 전처리 함수
  // static async handlePostData() {
  //   // id
  //   // state
  //   // energy source
  //   const id = localStorage.getItem("selectedLocationId");
  //   const state = LocationModel.getById(id).state;
  //   const energyPerSourceArray = await this.calculateEnergyPerSource(id);

  //   const data = energyPerSourceArray.map((item) => ({
  //     ...item,
  //     id: id,
  //     state: state,
  //   }));
  //   return data;
  // }
  static async handlePostData() {
    const id = localStorage.getItem("selectedLocationId");
    const locationData = LocationModel.getById(id);
  
    if (!locationData) {
      throw new Error("No location data found for the selected ID.");
    }
  
    const state = locationData.state;
    const energyPerSourceArray = await this.calculateEnergyPerSource(id); // 이 함수가 올바른 데이터를 반환하는지 확인
  
    // 데이터를 올바른 형태로 매핑
    const data = {
      id: id,
      state: state,
      energyPerSourceArray: energyPerSourceArray,
    };
  
    return data; // data는 객체 형태여야 함
  }
  

  static async sendStatic() {

    const body = await this.handlePostData();

    fetch("/leaderBoard/leaderBoardPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status == 200) {
        window.location = "/views/leaderboard.html";
        //alert(response.message);
        //this.localStorage.push({energysource : body})
      } else {
        alert("Error submitting order - status: " + response.status);
      }
    });
  }
}

/* 프론트엔드 컨트롤러에서 sendStatic() 함수가 fetch("/leaderBoard/leaderBoardPost")로 
POST 요청을 보내면, 백엔드에서 이 함수가 호출되어 데이터를 처리합니다.
프론트엔드에서 받은 데이터를 리더보드에 저장하는 로직을 처리한 후, 성공하면 클라이언트(프론트엔드)로 응답을 보냅니다. */