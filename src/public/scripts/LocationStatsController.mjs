import {
  LocationModel
} from "./LocationModel.mjs";


export class LocationStatsController {
  static  {
    // Setup event listeners here
    
    // Trigger initial load and render here
    this.renderLocationState()
    this.renderStateForSource()
}



//Render state source
static renderStateForSource() {
  // Load the products from the backend
  // in the real world, this comes from a fetch
  let sources = []

  sources = fetch("/location/locationStaticsRoutes")
    .then(response => response.json())
    .then(sources => {

      // const sources = NationalSourceModel.getAll(); // Fetch locations

      const sourceList = document.getElementById("state-list")

      // clear the old itmes in the select element
      sourceList.innerHTML = ""

      for (const source of sources) {
        const stateSourceItem = document.createElement("li")

        const source1 = document.createElement("span")
        source1.innerText = source.windProportion
        stateSourceItem.appendChild(source1)

        const source2 = document.createElement("span")
        source2.innerText = source.solarProportion
        stateSourceItem.appendChild(source2)

        const source3 = document.createElement("span")
        source3.innerText = source.gasProportion
        stateSourceItem.appendChild(source3)

        const source4 = document.createElement("span")
        source4.innerText = source.coalProportion
        stateSourceItem.appendChild(source4)
      }
      sourceList.appendChild(stateSourceItem)
    })
    .catch(error => {
      console.error("Failed to load appliances:", error);
    });
  }




//Render location state 
static renderLocationState() {

  const locationSates = LocationModel.getAll(); // Fetch locations
  const locationStateList = document.getElementById("state-list")
  // Clear the list
  locationStateList.innerHTML = ""

  for (const locationState of locationSates) {

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

    // Create the list item
    const stateItem = document.createElement("li")

    const heading = document.createElement("h2")
    heading.innerText = locationState.name
    stateItem.appendChild(heading)

} locationStateList.appendChild(stateItem)

}




// Go to location list
static backLocationList(id) {
  // Redirect to the edit page for that location 
  window.location = "/views/location_list.html"
}



// Load state source proportion(fetch)

// Post state to leader board and go to leader board (post fetch)
static postToLeaderBoard() {

}
}
