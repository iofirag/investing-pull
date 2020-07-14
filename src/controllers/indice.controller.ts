import { Request, Response } from "express";
import GenericFunctions from "./genericFunctions";
import { IndiceModel as model, IIndice } from "../models/indice.model";
import Utils from "../utils/utils";
import { IndiceLogModel } from "../models/indiceLog.model";

export class IndiceController {
  // ***************** CRUD *********************************
  public static create = async (req: Request, res: Response) => {
    const newItem = { ...req.body };
    return await GenericFunctions.create(model, newItem, req, res);
  };
  public static getById = async (req: Request, res: Response) => {
    return await GenericFunctions.getById(model, req, res);
  };
  public static updateById = async (req: Request, res: Response) => {
    let updatedData = { ...req.body };
    return await GenericFunctions.updateById(model, updatedData, req, res);
  };
  public static deleteById = async (req: Request, res: Response) => {
    return await GenericFunctions.deleteById(model, req, res);
  };
  public static getAll = async (req: Request, res: Response) => {
    const list = await GenericFunctions.getAll(model);
    return res.json(list)
  };
  public static deleteAll = async (req: Request, res: Response) => {
    return await GenericFunctions.deleteAll(model, req, res);
  };
  // *********************************************************
  public static calculateIndices = async (req: Request, res: Response) => {
    const indicesList: IIndice[] = await GenericFunctions.getAll(model);
    const indicesLogList: any[] = []
    await Promise.all(indicesList.map(async indice => {
      const indiceObj = { 
        indiceSymbol: indice.name, 
        indiceId: indice._id 
      }
      const technicalSummaryData = await Utils.fetchInvestingTechnicalSummaryData(indiceObj)
      const indiceLog = {
        indiceId: indice._id,
        technicalSummary: technicalSummaryData,
      }
      indicesLogList.push(indiceLog)
    }))
    IndiceLogModel.insertMany(indicesLogList, (err, docs) => {
      if (err){
        return Utils.handleError(err, res);
      } else {
        return res.status(200).json(`${docs.length} Completed`);
      }
    })
  }
  public static test = async (req: Request, res: Response) => {
    return await GenericFunctions.test(model, req, res);
  };
}
