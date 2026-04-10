require("dotenv").config();  
const app = require("./app/app");
const connectDB = require("./app/config/db");


connectDB();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});