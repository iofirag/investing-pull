import { Request, Response, Router } from "express";
import { IndiceRouter } from "./indice.routes";
import { IndiceLogRouter } from "./indiceLog.routes";

export const apiRouter: Router = Router();

apiRouter
  // Add here all your Entities collections
  .use("/indice", IndiceRouter)
  .use("/indiceLog", IndiceLogRouter)

  .get("/", (req: Request, res: Response) => {
    const pageContent: string = `<h1>Our King 👑 api</h1>`;
    res.status(200).send(pageContent);
  });
