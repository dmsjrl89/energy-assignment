import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import favicon from "serve-favicon";
import applianceRoutes from "./routes/appliance.mjs";
import locationStaticsRoutes from "./routes/locationStatics.mjs";
import leaderBoardRoutes from "./routes/leaderboard.mjs";
<<<<<<< HEAD
import { LeaderBoardModel } from "./models/LeaderBoardModel.mjs";
=======
>>>>>>> 7b4100066a4af4d2eaa33580ac93f6c15049325f

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

// TODO: redirect / to homepage
app.get("/", (req, res) => {
  res.redirect("/views/location_list.html");
});

<<<<<<< HEAD
// 리더보드 데이터를 반환하는 API 엔드포인트
app.get('/leaderBoard', (req, res) => {
  const leaderboardData = LeaderBoardModel.getAll(); // 적절한 데이터 가져오기
  console.log('Leaderboard Data:', leaderboardData); // 로그를 통해 반환되는 데이터 확인
  res.json(leaderboardData);
});


=======
>>>>>>> 7b4100066a4af4d2eaa33580ac93f6c15049325f
app.post("/leaderBoard/leaderBoardPost", (req, res) => {
  res.redirect("/views/leaderboard.html");
});

<<<<<<< HEAD


app.delete('/leaderBoard/leaderBoardPost/:id', async (req, res) => {
  const id = req.params.id;
  console.log('Received ID for deletion:', id); // 요청받은 ID 로그

  try {
      const deletedCount = await LeaderBoardModel.deleteById(id);

      if (deletedCount === 0) {
          console.log('Entry not found for ID:', id); // 삭제할 항목이 없을 때 로그
          return res.status(404).send('Entry not found');
      }

      res.status(200).send('Entry deleted successfully');
  } catch (error) {
      console.error('Error deleting entry:', error);
      res.status(500).send('Failed to delete entry');
  }
});


app.use('/scripts', express.static(path.join(__dirname, 'scripts'), {
  setHeaders: (res, path) => {
      if (path.endsWith('.mjs')) {
          res.set('Content-Type', 'application/javascript');
      }
  }
}));


=======
>>>>>>> 7b4100066a4af4d2eaa33580ac93f6c15049325f
// Setup serving of public files (frontend)
app.use(express.static("src/public"));

//Set the favicon
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Start the server
const port = 8080;
app.listen(port, () =>
  console.log("Started server on http://localhost:" + port)
);
