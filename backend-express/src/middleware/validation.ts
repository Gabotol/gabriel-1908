import { type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';

import { StatusCodes } from 'http-status-codes';

export function validateData(schema: z.ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => ({
        message: `${issue.path.join('.')} - ${issue.message}`,
      }));
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
    }

    req.body = result.data; 
    next();
  };
}