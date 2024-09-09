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



  // Render locations
  static renderLocations() {

    let appliances = []

    appliances = fetch("/appliance/applianceRoutes")
      .then(response => response.json())
      .then(appliances => {

        

        const locations = LocationModel.getAll(); // Fetch locations
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
          wattHours.innerText = "Total Running Hours:" + location.totalRunningHours
          locationItem.appendChild(wattHours)


          const applianceCount = document.createElement("span")
          applianceCount.innerText = "Number of Appliances:" +location.numberOfAppliances
          locationItem.appendChild(applianceCount)


          const statsButton = document.createElement("input")
          statsButton.type = "button"
          statsButton.value = "Stats"
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

  ///// add watts value into the render appliance web page
}
