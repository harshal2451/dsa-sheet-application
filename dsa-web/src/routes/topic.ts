import express, { Router } from "express";
import { ServiceContainer } from "../container";
import status from 'http-status-codes';
import { ResponseFormat } from "../core/responseFormat";
import Boom from "boom";
import { messages } from "./constants";
import { tokenMiddleware } from "../middleware";

const response = new ResponseFormat();

export const configure = (app: Router, container: ServiceContainer) => {
    const group = express.Router();


    group.get('/', (req, res) => {
        const page = Number(req.query.page as string || "1")
        const limit = Number(req.query.limit as string || "5");
        container.topicsService.listTopics(page, limit).then(result => {
            response.handleSuccess(res, {
                type: messages.SUCCESS,
                code: status.OK,
                data: result
            });
        }).catch((err) => {
            const { output } = Boom.badRequest(err.message);
            return response.handleError(res, output);
        });
    });

    
    group.get('/problems/:id', tokenMiddleware(), (req, res) => {
        const topicId = Number(req.params.id);
        const page = Number(req.query.page as string || "1")
        const limit = Number(req.query.limit as string || "5");
        const difficultyFilter = req.query.difficulty_level || "all";
        container.topicsService.listProblemStatements((req as any).claims.id, topicId, page, limit, difficultyFilter as string).then(result => {
            response.handleSuccess(res, {
                type: messages.SUCCESS,
                code: status.OK,
                data: result
            });
        }).catch((err) => {
            const { output } = Boom.badRequest(err.message);
            return response.handleError(res, output);
        });
    });

    app.use('/topic', group);
}