import express, { Express } from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectToServer } from "./db/conn";
import recordRoutes from "./routes/record";

config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(recordRoutes);

app.listen(port, () => {
  connectToServer((err) => {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
