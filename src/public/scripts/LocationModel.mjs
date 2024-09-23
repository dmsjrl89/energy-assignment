


export class LocationModel {

  static searchTerm = "";
  static appliances = []


  static {
    if (localStorage.getItem("locations") == null) {
      const entries = []
      localStorage.setItem("locations", JSON.stringify(entries))
    }
  }

  

  static store(entry) {
    // Load the list from localstorage
    const entries = JSON.parse(localStorage.getItem("locations"))

    // Add the entry to it
    entries.push(entry)

    // Save the list back to localstorage
    localStorage.setItem("locations", JSON.stringify(entries))
  }


  static update(entry) {
    // Load the list from localstorage
    const entries = JSON.parse(localStorage.getItem("locations"))

    for (let index = 0; index < entries.length; index++) {
      if (entries[index].id == entry.id) {
        entries[index] = entry
        break
      }
    }

    // Save the list back to localstorage
    localStorage.setItem("locations", JSON.stringify(entries))
  }

  static delete(id) {
 
    let entries = JSON.parse(localStorage.getItem("locations"))

    entries = entries.filter(e => e.id != id)

    localStorage.setItem("locations", JSON.stringify(entries))
  }

  static getAll() {
    const entries = JSON.parse(localStorage.getItem("locations"))
    return entries.map(e => new LocationModel(
      e.id,
      e.name,
      e.state,
      e.appliances
    ))
  }

  static getById(id) {
    // Load the locations from local storage
    const entries = JSON.parse(localStorage.getItem("locations"))

    // Find the entry with a match ID
    const entry = entries.find(e => e.id == id)

    // Check if we actually found a matching entry 
    if (entry != null) {
      // Construct a model object out of that entry's data
      return new LocationModel(
        entry.id,
        entry.name,
        entry.state,
        entry.appliances,
        entry.totalConsumption,
        entry.numberOfAppliances
      )
    } else {
      return null
    }
  }


  static getByName(name) {
    // Load the locations from local storage
    const entries = JSON.parse(localStorage.getItem("locations"))

    // Find the entry with a match ID
    const entry = entries.find(e => e.name == name)

    // Check if we actually found a matching entry 
    if (entry != null) {
      // Construct a model object out of that entry's data
      return new LocationModel(
        entry.id,
        entry.name,
        entry.state,
        entry.appliances,
        entry.totalConsumption,
        entry.numberOfAppliances
      )
    } else {
      return null
    }
  }

  // Member fields

  /**
   * ID (uuid) of the location - unique across all locations
   */
  id = ""

  /**
   * Location name 
   */
  name = ""

  /**
   * Location state - must be from national sources state list
   */
  state = ""

  // totalConsumption = 0

  // numberOfAppliances = 0
  /**
   * contains: {
   *      name: "",
   *      hours: 0.0,
   *      quantity: 0,
   *      watts: 0
   * }
   */
  appliances = []

  constructor(id, name, state, appliances) {
    this.id = id ?? window.crypto.randomUUID()
    this.name = name
    this.state = state
    this.appliances = appliances
    this.totalConsumption = this.getTotalRunningHours()
    this.numberOfAppliances = this.getNumberOfAppliances()
    // this.energyPerSource = this.calculateEnergyPerSource(NationalSourceModel.setDataSource())    
  }

//Get number of appliances
  getNumberOfAppliances() {
// Ensure this is returning the correct count
    return this.appliances.length 
  }

//Get total energy
  getTotalRunningHours() {
    let totalSum = 0
      for (const appliance of this.appliances) {
        const runningHours = parseFloat(appliance.hours)
        const count = parseInt(appliance.quantity, 10)
        const watts = appliance.watts
        totalSum += runningHours * count * watts
        
      }
    return totalSum;
  }



// searchTerm
  static setSearchTerm(searchTerm) {
    this.searchTerm = searchTerm;
}

static getSearchResults() {
  const entries = JSON.parse(localStorage.getItem("locations"))
  return  entries.map(entry => new  LocationModel(
    entry.id,
    entry.name,
    entry.state,
    entry.appliances,
    entry.totalConsumption,
    entry.numberOfAppliances
  )).filter(location => 
          this.searchTerm === ""
          || location.name.toLowerCase().includes(this.searchTerm.toLowerCase()) 
          || location.state.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
}

static addLocation(location) {
  this.locations.push(location);
}



// calculateEnergyPerSource(watts) {
//   const watts = appliance.watts
//   const totalEnergy = watts
//   for (const appliance of this.appliances) {
//   return {
//     wind: totalEnergy * (energySources.wind / 100),
//     solar: totalEnergy * (energySources.solar / 100),
//     gas: totalEnergy * (energySources.gas / 100),
//     coal: totalEnergy * (energySources.coal / 100)
//   }}
// }




}
