import express from 'express';

export interface SuccessResponse {
    type: string;
    code: number,
    data: any,
}
export class ResponseFormat {

    constructor() { }

    handleSuccess(res: express.Response, obj: SuccessResponse) {
        const {
            code,
            type,
            data,
        } = obj;
        return res.status(code).json({
            code,
            type,
            data,
        });
    }

    handleError(res: express.Response, obj: any) {
        const payload = {
            code: obj.statusCode,
            type: 'error',
            data: obj.payload.message
        }
        res.status(obj.statusCode).json(payload);
    }
    

    handleErrorCustom(obj: any) {
        const res = express.response;
        res.status(obj.statusCode).json(obj);
    }
}