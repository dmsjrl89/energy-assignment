import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import favicon from "serve-favicon";
import applianceRoutes from "./routes/appliance.mjs";
import locationStaticsRoutes from "./routes/locationStatics.mjs";
import leaderBoardRoutes from "./routes/leaderboard.mjs";
import { LeaderBoardModel } from "./models/LeaderBoardModel.mjs";
import nationalStaticsRoutes from "./routes/nationalStatics.mjs";

const app = express();

// Setup the view engine
app.set("view engine", "ejs");

// Setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tell express where to find the views
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "/views")); // BUG: Does this work?

// Setup serving public files (static files like html, js, css, images)
app.use(express.static(path.join(__dirname, "../src/public")));

// TODO: Setup routes
app.use("/appliance", applianceRoutes);
app.use("/location", locationStaticsRoutes);
app.use("/leaderBoard", leaderBoardRoutes);
app.use("/national", nationalStaticsRoutes)

// TODO: redirect / to homepage
app.get("/", (req, res) => {
  res.redirect("/views/location_list.html");
});

// 리더보드 데이터를 반환하는 API 엔드포인트
app.get('/leaderBoard', (req, res) => {
  const leaderboardData = LeaderBoardModel.getAll(); // 적절한 데이터 가져오기
  console.log('Leaderboard Data:', leaderboardData); // 로그를 통해 반환되는 데이터 확인
  res.json(leaderboardData);
});


app.post("/leaderBoard/leaderBoardPost", (req, res) => {
  res.redirect("/views/leaderboard.html");
});



// Assuming Express.js backend
app.patch('/leaderBoard/leaderBoardPost/:id', (req, res) => {
  const { id } = req.params;
  const { energyPerSourceArray } = req.body;

  // 해당 ID의 entry를 찾고 업데이트
  const updatedCount = LeaderBoardModel.update(id, { energyPerSourceArray });

  if (updatedCount > 0) {
    res.status(200).send('Entry updated successfully');
  } else {
    res.status(404).send('Entry not found');
  }
});




app.use('/scripts', express.static(path.join(__dirname, 'scripts'), {
  setHeaders: (res, path) => {
      if (path.endsWith('.mjs')) {
          res.set('Content-Type', 'application/javascript');
      }
  }
}));


// Setup serving of public files (frontend)
app.use(express.static("src/public"));

//Set the favicon
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Start the server
const port = 8080;
app.listen(port, () =>
  console.log("Started server on http://localhost:" + port)
);