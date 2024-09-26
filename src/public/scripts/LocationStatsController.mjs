import {
  LocationModel
} from "./LocationModel.mjs";

export class LocationStatsController {
  static locationId = "";
  static applianceLists = [];

  static {
    //Setup event listeners here
    document.getElementById("back-button").addEventListener("click", () => {
      this.backButton();
    });

    // Trigger initial load and render here
    this.renderLocationName();
    // this.renderNationalSource()
    // this.addApplianceWatts()
    // console.log("Hello");
    //console.log(this.calculateEnergyPerSource("Home"));
  }

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
        const energyPerSourceArray = await this.calculateEnergyPerSource(locationId);

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
          labels: ['Wind', 'Solar', 'Gas', 'Coal'],
          datasets: [{
            label: 'Energy Consumption (watts)',
            data: [totalWind, totalSolar, totalGas, totalCoal],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)', // Wind color
              'rgba(255, 205, 86, 0.2)', // Solar color
              'rgba(54, 162, 235, 0.2)', // Gas color
              'rgba(255, 99, 132, 0.2)' // Coal color
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        };

        // Create the chart
        const ctx = document.getElementById('energyChart').getContext('2d');
        const energyChart = new Chart(ctx, {
          type: 'bar', // Type of chart
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
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

      }
    }
  }


  static renderEnergyList(calculateEnergyPerSource) {
    const energyListElement = document.getElementById("location-stats-name")
    energyListElement.innerHTML = `
    Energy consumed per energy source:
    <ul>
      <li>wind: ${calculateEnergyPerSource.wind} </li>
      <li>solar: ${calculateEnergyPerSource.solar}</li>
      <li>gas: ${calculateEnergyPerSource.gas}</li>
      <li>coal: ${calculateEnergyPerSource.coal}</li>
    `
  }


  // example: this.calculateEnergyPerSource("Home");
  static async calculateEnergyPerSource(locationId) {
    let results = [];
    // 로컬스토리지 아이디로 가전제품 정보들 가져오기
    const locationNameArray = LocationModel.getById(locationId);
    //const locationNameArray = LocationModel.getByName(name);
    // 가전제품 배열 : 이름이 들고있는 가전제품 배열 순회하기
    let appliances = locationNameArray["appliances"];
    // 지역 이름으로 지역 에너지 정책 가져오기
    const stateName = locationNameArray.state;

    const nationalSources = await this.renderEnergyperSource(stateName);
    // watts랑 에너지 정책으로 계산
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
}


// location stats 페이지에서 appliances는 렌더링이 아니라
// location model에 있는 리스트 불러와서 watts값 가져와서 계산하는거.
// 계산한 값을 statics 페이지에 렌더링 하는거.
