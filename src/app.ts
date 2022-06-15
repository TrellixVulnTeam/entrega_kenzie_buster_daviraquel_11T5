import express, { Request, Response, NextFunction, response } from "express";

import { AppError } from "./errors/appError";
import { appRoutes } from "./routes";

const app = express();

app.use(express.json());

appRoutes(app);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// app.listen(3000);

export default app;
