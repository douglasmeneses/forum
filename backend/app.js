const express = require("express");
const { expressjwt: jwt } = require("express-jwt"); // Corrigir a importação
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const app = express();
const port = 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync().then(() => {
  console.log("Database & tables synchronized!");
});

app.use(express.json());

const jwtSecret = "your_jwt_secret"; // Replace with your actual secret

// Protected routes
app.use(
  jwt({ secret: jwtSecret, algorithms: ["HS256"] }).unless({
    path: ["/api/users/create", "/api/users/login"], // Exclude user creation and login routes from JWT validation
  })
);
// Public routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

module.exports = app;
