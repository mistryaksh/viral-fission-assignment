import express, { type Express } from "express";
import { appRouter } from "./routes";
import { config, connectDb } from "./config";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import {
  errorHandler,
  multerErrorHandler,
  notFoundMiddleware,
} from "./middleware";

export const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  bodyParser.json({
    limit: "5mb",
  }),
);
app.use(bodyParser.urlencoded({ extended: true }));

appRouter.register(app);
app.use(multerErrorHandler);
app.use(notFoundMiddleware);
app.use(errorHandler);

const startServer = async () => {
  try {
    app.listen(config.PORT, async (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`Server running on port ${config.PORT}`);
        await connectDb();
      }
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
};

startServer();
