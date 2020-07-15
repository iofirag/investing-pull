import { Request, Response } from "express";
import GenericFunctions from "./genericFunctions";
import { IndiceLogModel as model } from "../models/indiceLog.model";
import { IndiceModel } from '../models/indice.model'
import Utils from "../utils/utils";

export class IndiceLogController {
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
  public static getIndiceLogList = async (req: Request, res: Response) => {
    const indiceList = await model.find({}).populate('indiceId')
    return res.json(indiceList)
  };
  public static getAllIndiceLogByIndiceName = async (req: Request, res: Response) => {
    const indiceNameParam: string = req.query.indiceName as string
    try {
      const indiceDoc = await IndiceModel.findOne({'name':indiceNameParam})
      if (indiceDoc) {
        const indiceLogDocs = await model.find({'indiceId':indiceDoc._id})
        return res.json(indiceLogDocs)
      } else {
        // indice empty
        return Utils.handleError(`indice.name=${name} empty`, res);
      }
    } catch (ex) {
      return Utils.handleError(ex, res);
    }
  };
  public static test = async (req: Request, res: Response) => {
    return await GenericFunctions.test(model, req, res);
  };
}
