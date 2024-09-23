import {
  LocationModel
} from "./LocationModel.mjs"


export class LocationEditController {
  static locationId = ""
  static applianceLists = []

  static {
    // Get the location id from the query string
    const urlParams = new URLSearchParams(window.location.search)
    this.locationId = urlParams.get("id")
    this.applianceLists = LocationModel.getById(this.locationId).appliances


    // Setup cancel events
    document.getElementById("cancel-button")
      .addEventListener("click", () => {
        this.cancelEditing()
      })

    // Setup save events
    document.getElementById("save-location")
      .addEventListener("click", () => {
        this.saveLocation()
      })

    document.getElementById("add-button")
      .addEventListener("click", () => {
        this.addAppliance()
      })


    // Initial render
    this.renderLocation()
    this.renderApplianceSelect()
    this.renderStateSelect()
    this.renderApplianceDetailList()
  }



  // Cancel editing
  static cancelEditing() {
    window.location = "/views/location_list.html"
  }


  // render location
  static renderLocation() {
    const location = LocationModel.getById(this.locationId)
    const locationName = document.getElementById("location-name")
    locationName.value = location.name
  }


  //Fetch state 
  static renderStateSelect() {
    // Load the products from the backend
    // in the real world, this comes from a fetch
    let states = []

    states = fetch("/location/locationStaticsRoutes")
      .then(response => response.json())
      .then(states => {

        //get the select element from the view
        const applianceSelect = document.getElementById("location-state")

        // clear the old itmes in the select element
        applianceSelect.innerHTML = ""


        for (const state of states) {
          const option = document.createElement("option")
          option.value = state.state
          option.innerText = state.state
          //now that it is created we add it to the select element. 
          applianceSelect.appendChild(option)
        }
      })
      .catch(error => {
        console.error("Failed to load appliances:", error);
      });

  }



  //Fetch appliances and render select box
  static renderApplianceSelect() {

    let appliances = []

    appliances = fetch("/appliance/applianceRoutes")
      .then(response => response.json())
      .then(appliances => {

        const applianceSelect = document.getElementById("location-appliance")

        // clear the old itmes in the select element
        applianceSelect.innerHTML = ""


        for (const appliance of appliances) {
          const option = document.createElement("option")
          option.value = appliance.name
          option.innerText = appliance.name
          //now that it is created we add it to the select element. 
          applianceSelect.appendChild(option)

        }
      })
      .catch(error => {
        console.error("Failed to load appliances:", error);
      });

  }

  // Appliance list delete
  static applianceListDelete(id) {
    let appliance = []
    let entries = this.applianceLists
    for (const entry of entries) {
      if (entry.id != entry.id) {
        appliance.push(entry)
      }
      return this.applianceLists = appliance
    }
    this.renderApplianceDetailList()
  }


  // Add Appliance
  static addAppliance() {
    const applianceId = window.crypto.randomUUID()
    const applianceName = document.getElementById("location-appliance").value
    const applianceHours = document.getElementById("location-hours").value
    const applianceQuantity = document.getElementById("location-quantity").value
/* getElementById: Returns a HTMLCollection of the elements in the object on 
which the method was invoked (a document or an element) that have 
all the classes given by classNames. The classNames argument is interpreted 
as a space-separated list of classes. */

    fetch("/appliance/applianceRoutes")
      .then(response => response.json())
      .then(appliances => {
// appliances: arrow function.
        let applianceWatts = 0
        for (const appliance of appliances) {

          if (appliance.name == applianceName) {
            applianceWatts = appliance.watts
            break
          }
        }

        this.applianceLists.push({
          id: applianceId,
          name: applianceName,
          hours: applianceHours,
          quantity: applianceQuantity,
          watts: applianceWatts
        })
        this.renderApplianceDetailList()
      })
  }
//push: Appends new elements to the end of an array, and returns the new length of the array.

  //Render appliance list
  static renderApplianceDetailList() {
    const applianceDetailList = document.getElementById("appliance-details")
   
    applianceDetailList.innerHTML = "" // Clear the list

    for (const appliance of this.applianceLists) {
//applianceLists : using the property already declared at top.

      // Create the list item
      const applianceItem = document.createElement("li")

      const applianceName = document.createElement("p")
      applianceName.innerText = appliance.name
      applianceItem.appendChild(applianceName)

      const applianceHours = document.createElement("p")
      applianceHours.innerText = "Hours:" + appliance.hours
      applianceItem.appendChild(applianceHours)

      const applianceQuantity = document.createElement("p")
      applianceQuantity.innerText = "Quantity:" + appliance.quantity
      applianceItem.appendChild(applianceQuantity)


      // internal delete button
      const deleteButton = document.createElement("input")
      deleteButton.type = "button"
      deleteButton.value = "Delete"
      deleteButton.addEventListener("click", () => {
        this.applianceListDelete()
      })
      applianceItem.appendChild(deleteButton)
      applianceDetailList.appendChild(applianceItem)
    }
  }



  static saveLocation() {
    // Load the location model instance
    const location = LocationModel.getById(this.locationId)

    // TODO: Show error message if location is null

    // Update the location instance's name
    const locationName = document.getElementById("location-name")
    location.name = locationName.value

    const locationState = document.getElementById("location-state")
    location.state = locationState.value

    location.appliances = this.applianceLists

    LocationModel.update(location)

    // redirect back to the list page
    window.location = "/views/location_list.html"
  }
}
