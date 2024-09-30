import {
  LocationModel
} from "./LocationModel.mjs"

export class LeaderBoardFrontController {
static {
    // Setup event listeners here
    
    // Trigger initial load and render here
}
 
static renderStatics() {



}

//Load(fetch) and render 

//Delete leader board items

//Sort leader board items(by source proportion)

}





// document.getElementById("order-send")
// .addEventListener("click", (event) => {
//     this.sendOrder();
// })

//   static sendOrder() {
//         const order = OrderModel.getAllProductsWithQuantities();
//         fetch("/kitchen/queue/add", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(order)
//         }).then(response => {
//             if (response.status == 200) {
//                 OrderModel.clear();
//                 this.renderProductDetailsForOrder();
//                 this.renderOrderDetails();
//             } else {
//                 alert("Error submitting order - status: " + response.status);
//             }
//           })
//         }
   