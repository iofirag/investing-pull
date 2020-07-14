import { Router } from "express";
import { IndiceController as cont } from "../controllers/indice.controller";

export const IndiceRouter: Router = Router()

  // put here new api's
  .get("/calculateIndices", cont.calculateIndices)
  .get("/test", cont.test)

  // Bulk actions
  .get('/getAll', cont.getAll)
  .delete('/deleteAll', cont.deleteAll)
  
  // Leave at the end
  .post("/", cont.create)
  .get("/:_id", cont.getById)
  .put("/:_id", cont.updateById)
  .delete("/:_id", cont.deleteById)

  
  
