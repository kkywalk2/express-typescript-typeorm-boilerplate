import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../controller/Response'

function ExceptionMiddleware(exceptionInfo: ExceptionInfo, req: Request, res: Response, next: NextFunction) {
  res.status(exceptionInfo.statusCode).send(new ErrorResponse(exceptionInfo.info));
}

const WrapAsync = (fn: (req: Request, res: Response, next: NextFunction) => any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  }
}

class ExceptionInfo {
  statusCode : number
  info : any

  constructor(statusCode: number, info: any) {
    this.statusCode = statusCode
    this.info = info
  }
}

export { ExceptionMiddleware, WrapAsync, ExceptionInfo };