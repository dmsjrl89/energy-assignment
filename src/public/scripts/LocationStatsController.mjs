import {
  LocationModel
} from "./LocationModel.mjs";


export class LocationStatsController {
  static locationId = ""
  static applianceLists = []


  static {


    //Setup event listeners here
    document.getElementById("back-button")
      .addEventListener("click", () => {
        this.backButton()
      })

    // Trigger initial load and render here
    this.renderLocationName()
    // this.renderNationalSource()
    // this.addApplianceWatts()
    console.log("Hello")
    console.log(this.nameByEnergySource(1000, "Queensland"))
  }


  static backButton() {
    window.location = "/views/location_list.html"
  }



  static renderLocationName() {
    // 이전 페이지에서 저장한 location ID 가져오기
    const locationId = localStorage.getItem('selectedLocationId');

    if (locationId) {
      const location = LocationModel.getById(locationId);

      if (location) {
        const locationRenderList = document.getElementById("location-stats-name");
        locationRenderList.innerHTML = "";

        const applianceItem = document.createElement("li");

        const locationStatsName = document.createElement("p");
        locationStatsName.innerText = location.name;
        applianceItem.appendChild(locationStatsName);

        locationRenderList.appendChild(applianceItem);

        const locationStatsWatts = document.createElement("p");
        locationStatsWatts.innerText = location.energyPerSource;
        applianceItem.appendChild(locationStatsWatts);

        locationRenderList.appendChild(applianceItem);
      }
    }
  }


  // static renderNationalSource() {

  //   let nationalSources = []

  //   nationalSources = fetch("/location/locationStaticsRoutes")
  //   then(response => response.json())
  //     .then(nationalSources => {

  //       const sourceSelect = document.getElementById("location-stats-name")

  //       sourceSelect.innerHTML = ""
  //       for (const nationalSource of nationalSources) {
  //         const applianceItem = document.createElement("li");

  //         const applianceWatts = document.createElement("p");
  //         applianceWatts.innerText = nationalSource.name;
  //         applianceItem.appendChild(applianceWatts);

  //         locationRenderList.appendChild(applianceItem);

  //       }
  //     })
  // }





  static calculateEnergyPerSource(name) {

    const locationNameArray = localStorage.getByName(name)

    let totalEnergy = 0;
    let appliances = []

    appliances = fetch("/appliance/applianceRoutes")
      .then(response => response.json())
      .then(appliances => {

      })
      .catch(error => {
        console.error("Failed to load appliances:", error);
      });
  }



  static nameByEnergySource(watts, stateName) {

    let nationalSources = []
    let totalEnergy = 0
    let result = {}

    nationalSources = fetch("/location/locationStaticsRoutes")
      .then(response => response.json())
      .then((nationalSources) => {

        const nationalSource = nationalSources.find(e => e.state == stateName)
        console.log(JSON.stringify(nationalSource))

        totalEnergy += parseInt(watts)

        result = {
          wind: totalEnergy * (nationalSource.wind / 100),
          solar: totalEnergy * (nationalSource.solar / 100),
          gas: totalEnergy * (nationalSource.gas / 100),
          coal: totalEnergy * (nationalSource.coal / 100)
        }
        console.log(result)
        return result

      })
      .catch(error => {
        console.error("Failed to load appliances:", error);
      });

  }

}



//totals used from each source in watt hours. -> state이름을 연결하고, 
// getTotalRunningHours 끌어다 쓴다?  이게 토탈.
// static totalCalculation() {
// fetch array (getTotalRunningHours) = totalEnergy}

// render statics 창에는 location name이 나오고 
//a visualization of the division of energy used from different sources 
// 이게 source 각각 그래프로 나타내는거.


// location stats 페이지에서 appliances는 렌더링이 아니라 
// location model에 있는 리스트 불러와서 watts값 가져와서 계산하는거.
// 계산한 값을 statics 페이지에 렌더링 하는거. 