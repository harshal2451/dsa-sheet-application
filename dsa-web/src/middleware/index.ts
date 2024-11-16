import express from 'express';
import jwt from 'jsonwebtoken';
import { getEnv } from '../env';

export const tokenMiddleware = () => {
    const handler: express.RequestHandler = async (req, res, next) => {
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        // Read the ID Token from the Authorization header.
        token = req.headers.authorization.split('Bearer ')[1];
      } else {
        res.status(403).json({ error: 'No token found. Unauthorized' });
        return;
      }
  
      try {
        const v = jwt.verify(token, getEnv().LOGIN_SECRET);
        console.log("User Token =========>", token, v);
        (req as any).claims = v;
        
        next();
        return;
      } catch (error) {
        res.status(403).json({ code: 403, type: 'error', content: 'No token found. Unauthorized' });
        return;
      }
    };
    return handler;
  }