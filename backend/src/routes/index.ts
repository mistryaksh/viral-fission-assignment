import { Application } from "express";

// routes
import { healthRouter } from "./health.route";
import { videoRouter } from "./video.route";

class AppRouter {
  public register(app: Application) {
    const baseEndpoint = "/api/v1";
    const base =
      "/" +
      baseEndpoint
        .replace(/^https?:\/\//, "")
        .replace(/[^a-zA-Z0-9/_-]/g, "")
        .replace(/^\/+/, "");

    app.use(base, healthRouter);
    app.use(`${base}/video`, videoRouter);
  }
}

export const appRouter = new AppRouter();
