import express from "express"
import applianceRoutes from "./routes/appliance.mjs";
import { fileURLToPath } from "url";
import path from "path";
import locationStaticsRoutes from "./routes/locationStatics.mjs";
// Create a new express application (server)
const app = express()

// Setup the view engine
app.set("view engine", "ejs")

// Setup middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Tell express where to find the views
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "/views")); // BUG: Does this work?


// Setup serving public files (static files like html, js, css, images)
app.use(express.static(path.join(__dirname, "../src/public")));



// TODO: Setup routes
app.use("/appliance", applianceRoutes)
app.use("/location", locationStaticsRoutes)


// TODO: redirect / to homepage
app.get("/", (req, res) => {
    res.redirect("/views/location_list.html")
})


// app.get("/api/locations", (req, res) => {
//   res.json(LocationModel.getAll());
// });


// Setup serving of public files (frontend)
app.use(express.static("src/public"))

// Start the server
const port = 8080
app.listen(port, () => 
    console.log("Started server on http://localhost:" + port)
)