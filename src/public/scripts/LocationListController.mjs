import {
  LocationModel
} from "./LocationModel.mjs";

export class LocationListController {
  static {
    // Setup event listeners here
    document.getElementById("create-location")
      .addEventListener("click", () => {
        this.createNewLocation()
      })

    document.getElementById("filter-location")
      .addEventListener("input", (event) => {
        LocationModel.setSearchTerm(event.target.value)
        this.searchLocation()
      });



    // Trigger initial load and render here
    this.renderLocations()
    // this.statsLocation()
    // this.renderApplianceList()
  }

  static searchLocation() {
    const locations = LocationModel.getSearchResults(); // Apply search filter
    const locationList = document.getElementById("location-list")
    // Clear the list
    locationList.innerHTML = ""

    // Loop for each location in local storage
    for (const location of locations) {


      // Create the list item
      const locationItem = document.createElement("li")

      const heading = document.createElement("h2")
      heading.innerText = location.name
      locationItem.appendChild(heading)

      const state = document.createElement("span")
      state.innerText = "State:" + location.state
      locationItem.appendChild(state)

      const wattHours = document.createElement("span")
      wattHours.innerText = "Total Running Hours:" + location.totalConsumption
      locationItem.appendChild(wattHours)

      const applianceCount = document.createElement("span")
      applianceCount.innerText = "Number of Appliances:" + location.numberOfAppliances
      locationItem.appendChild(applianceCount)



      const statsButton = document.createElement("input")
      statsButton.type = "button"
      statsButton.value = "Stats"
      statsButton.addEventListener("click", () => {
        this.statsLocation(location.id)
      })
      locationItem.appendChild(statsButton)

      const editButton = document.createElement("input")
      editButton.type = "button"
      editButton.value = "Edit"
      editButton.addEventListener("click", () => {
        this.editLocation(location.id)
      })
      locationItem.appendChild(editButton)

      const deleteButton = document.createElement("input")
      deleteButton.type = "button"
      deleteButton.value = "delete"
      deleteButton.addEventListener("click", () => {
        this.deleteLocation(location.id)
      })
      locationItem.appendChild(deleteButton)

      // Add the list item to the list
      locationList.appendChild(locationItem)
    }
  }



  //Render locations
  static renderLocations() {

    let appliances = []

    appliances = fetch("/appliance/applianceRoutes")
      .then(response => response.json())
      .then(appliances => {



        const locations = LocationModel.getAll();
        // locations = JSON.parse(localStorage.getItem("locations"));
        const locationList = document.getElementById("location-list")

        // Clear the list
        locationList.innerHTML = ""


        // Loop for each location in local storage
        for (const location of locations) {


          // Create the list item
          const locationItem = document.createElement("li")

          const heading = document.createElement("h2")
          heading.innerText = location.name
          locationItem.appendChild(heading)

          const state = document.createElement("span")
          state.innerText = "State:" + location.state
          locationItem.appendChild(state)

          const wattHours = document.createElement("span")
          wattHours.innerText = "Total Running Hours:" + location.totalConsumption
          locationItem.appendChild(wattHours)


          const applianceCount = document.createElement("span")
          applianceCount.innerText = "Number of Appliances:" + location.numberOfAppliances
          locationItem.appendChild(applianceCount)


          const statsButton = document.createElement("input")
          statsButton.type = "button"
          statsButton.value = "Stats"
          statsButton.addEventListener("click", () => {
            this.statsLocation(location.id)
          })
          locationItem.appendChild(statsButton)

          const editButton = document.createElement("input")
          editButton.type = "button"
          editButton.value = "Edit"
          editButton.addEventListener("click", () => {
            this.editLocation(location.id)
          })
          locationItem.appendChild(editButton)

          const deleteButton = document.createElement("input")
          deleteButton.type = "button"
          deleteButton.value = "delete"
          deleteButton.addEventListener("click", () => {
            this.deleteLocation(location.id)
          })
          locationItem.appendChild(deleteButton)

          // Add the list item to the list
          locationList.appendChild(locationItem)
        }
      })
      .catch(error => {
        console.error("Failed to load locations:", error);
      });
  }




  static editLocation(id) {
    // Redirect to the edit page for that location 

    window.location = "/views/location_edit.html?id=" + id
  }

  // Create new and go to edit
  static createNewLocation() {

    // Create a blank location model 
    const location = new LocationModel(null, "", "", [])
    // Create (store) the location into localstorage
    LocationModel.store(location)
    // Redirect to the edit page for that blank location model
    this.editLocation(location.id)
  }


  static deleteLocation(locationId) {
    LocationModel.delete(locationId)
    this.renderLocations()

  }


  static statsLocation(id) {
    // 특정 id로 location 가져오기
    const location = LocationModel.getById(id);
    
    if (location) {
        // 원하는 데이터를 렌더링하거나 표시
        console.log("Location Stats:", location);
        // 예시: 다른 페이지로 이동하여 해당 location 정보를 표시할 수 있습니다.
        localStorage.setItem('selectedLocationId', id); // 다음 페이지에 데이터를 전달하기 위해 localStorage를 사용
        window.location = "/views/location_stats.html";
    } else {
        console.error("Location not found with id:", id);
    }
}

  ///// add watts value into the render appliance web page
}






// import {
//   LocationModel
// } from "./LocationModel.mjs";

// export class LocationListController {
//   static {
//     // Setup event listeners here
//     document.getElementById("create-location")
//       .addEventListener("click", () => {
//         this.createNewLocation()
//       })

//     document.getElementById("filter-location")
//       .addEventListener("input", (event) => {
//         LocationModel.setSearchTerm(event.target.value)
//         this.searchLocation()
//       });



//     // Trigger initial load and render here
//     this.renderLocations()
//     // this.renderApplianceList()
//   }

//   static searchLocation() {
//     const locations = LocationModel.getSearchResults(); // Apply search filter
//     const locationList = document.getElementById("location-list")
//     // Clear the list
//     locationList.innerHTML = ""

//     // Loop for each location in local storage
//     for (const location of locations) {


//       // Create the list item
//       const locationItem = document.createElement("li")

//       const heading = document.createElement("h2")
//       heading.innerText = location.name
//       locationItem.appendChild(heading)

//       const state = document.createElement("span")
//       state.innerText = "State:" + location.state
//       locationItem.appendChild(state)

//       const wattHours = document.createElement("span")
//       wattHours.innerText = "Total Running Hours:" + location.totalConsumption
//       locationItem.appendChild(wattHours)

//       const applianceCount = document.createElement("span")
//       applianceCount.innerText = "Number of Appliances:" + location.numberOfAppliances
//       locationItem.appendChild(applianceCount)



//       const statsButton = document.createElement("input")
//       statsButton.type = "button"
//       statsButton.value = "Stats"
//       statsButton.addEventListener("click", () => {
//         this.statsLocation(location.id)
//       })
//       locationItem.appendChild(statsButton)

//       const editButton = document.createElement("input")
//       editButton.type = "button"
//       editButton.value = "Edit"
//       editButton.addEventListener("click", () => {
//         this.editLocation(location.id)
//       })
//       locationItem.appendChild(editButton)

//       const deleteButton = document.createElement("input")
//       deleteButton.type = "button"
//       deleteButton.value = "delete"
//       deleteButton.addEventListener("click", () => {
//         this.deleteLocation(location.id)
//       })
//       locationItem.appendChild(deleteButton)

//       // Add the list item to the list
//       locationList.appendChild(locationItem)
//     }
//   }



//   //Render locations
//   static renderLocations() {

//     let appliances = []

//     appliances = fetch("/appliance/applianceRoutes")
//       .then(response => response.json())
//       .then(appliances => {



//         const locations = LocationModel.getAll();
//         // locations = JSON.parse(localStorage.getItem("locations"));
//         const locationList = document.getElementById("location-list")

//         // Clear the list
//         locationList.innerHTML = ""


//         // Loop for each location in local storage
//         for (const location of locations) {


//           // Create the list item
//           const locationItem = document.createElement("li")

//           const heading = document.createElement("h2")
//           heading.innerText = location.name
//           locationItem.appendChild(heading)

//           const state = document.createElement("span")
//           state.innerText = "State:" + location.state
//           locationItem.appendChild(state)

//           const wattHours = document.createElement("span")
//           wattHours.innerText = "Total Running Hours:" + location.totalConsumption
//           locationItem.appendChild(wattHours)


//           const applianceCount = document.createElement("span")
//           applianceCount.innerText = "Number of Appliances:" + location.numberOfAppliances
//           locationItem.appendChild(applianceCount)


//           const statsButton = document.createElement("input")
//           statsButton.type = "button"
//           statsButton.value = "Stats"
//           statsButton.addEventListener("click", () => {
//             this.statsLocation(location.id)
//           })
//           locationItem.appendChild(statsButton)

//           const editButton = document.createElement("input")
//           editButton.type = "button"
//           editButton.value = "Edit"
//           editButton.addEventListener("click", () => {
//             this.editLocation(location.id)
//           })
//           locationItem.appendChild(editButton)

//           const deleteButton = document.createElement("input")
//           deleteButton.type = "button"
//           deleteButton.value = "delete"
//           deleteButton.addEventListener("click", () => {
//             this.deleteLocation(location.id)
//           })
//           locationItem.appendChild(deleteButton)

//           // Add the list item to the list
//           locationList.appendChild(locationItem)
//         }
//       })
//       .catch(error => {
//         console.error("Failed to load locations:", error);
//       });
//   }




//   static editLocation(id) {
//     // Redirect to the edit page for that location 

//     window.location = "/views/location_edit.html?id=" + id
//   }

//   // Create new and go to edit
//   static createNewLocation() {

//     // Create a blank location model 
//     const location = new LocationModel(null, "", "", [])
//     // Create (store) the location into localstorage
//     LocationModel.store(location)
//     // Redirect to the edit page for that blank location model
//     this.editLocation(location.id)
//   }


//   static deleteLocation(locationId) {
//     LocationModel.delete(locationId)
//     this.renderLocations()

//   }

//   // static statsLocation(id) {
//   //   // Redirect to the stats page for that location 
//   //   window.location = "/views/location_stats.html?id=" + id
//   // }

//   static statsLocation(id) {
//     // 특정 id로 location 가져오기
//     const location = LocationModel.getById(id);
    
//     if (location) {
//         // 원하는 데이터를 렌더링하거나 표시
//         console.log("Location Stats:", location);
//         // 예시: 다른 페이지로 이동하여 해당 location 정보를 표시할 수 있습니다.
//         localStorage.setItem('selectedLocationId', id); // 다음 페이지에 데이터를 전달하기 위해 localStorage를 사용
//         window.location = "/views/location_stats.html";
//     } else {
//         console.error("Location not found with id:", id);
//     }
// }

//   ///// add watts value into the render appliance web page
// }
