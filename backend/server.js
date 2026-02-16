const express = require("express");
const cors = require("cors");
const app = express();

// Configure CORS to allow requests from your Frontend/Nginx
var corsOptions = {
  origin: "*" 
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

// Database connection logic
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Simple route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the MEAN application backend." });
});

// Import your routes (ensure this file exists in your project)
require("./app/routes/turorial.routes")(app);

// set port, listen for requests
// Using 0.0.0.0 is CRITICAL for Docker networking
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}.`);
});
