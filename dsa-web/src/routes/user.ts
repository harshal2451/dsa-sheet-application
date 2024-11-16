import express, { Router } from "express";
import { ServiceContainer } from "../container";
import status from 'http-status-codes';
import Boom from "boom";
import { messages } from "./constants";
import { ResponseFormat } from "../core/responseFormat";
import { tokenMiddleware } from "../middleware";

const response = new ResponseFormat();

export const configure = (app: Router, container: ServiceContainer) => {
    const group = express.Router();

    group.post('/login', (req, res) => {
        const {username , password} = req.body;
        container.userService.login(username, password).then(result => {
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

    group.post('/complete_problem', tokenMiddleware(), (req, res) => {
        const { problem_id, topic_id, action} = req.body;
        container.userService.completeTopic((req as any).claims.id, problem_id, topic_id, action).then(result => {
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


    app.use('/user', group);

}