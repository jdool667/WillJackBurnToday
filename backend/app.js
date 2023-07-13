const express = require("express");
require("dotenv").config();
const cors = require("cors");
const routers = require("./routes/routers");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", routers);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = parseInt(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
