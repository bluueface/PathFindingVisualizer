import express, { Request, Response } from "express";
import { PORT } from "../config";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Express!");
});

app.listen(PORT, () => {
  console.log(process.env.PORT);

  console.log(`Server is running at http://localhost:${PORT}`);
});
