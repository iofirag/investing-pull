import { Router } from "express";
import { IndiceLogController as cont } from "../controllers/indiceLog.controller";

export const IndiceLogRouter: Router = Router()
  // put here new api's
  .get("/test", cont.test)
  .get('/getIndiceLogList', cont.getIndiceLogList)
  .get('/getAllIndiceLogByIndiceName', cont.getAllIndiceLogByIndiceName)

  // Bulk actions
  .get('/getAll', cont.getAll)
  .delete('/deleteAll', cont.deleteAll)
  
  // Leave at the end
  .post("/", cont.create)
  .get("/:_id", cont.getById)
  .put("/:_id", cont.updateById)
  .delete("/:_id", cont.deleteById)

  
  
