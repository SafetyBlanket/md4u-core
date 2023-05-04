import express, { Request, Response } from 'express';
import controller from './files.controller';
export default express
  .Router()
  .get('/:bucket', controller.list)
  .delete('/:bucket', controller.delete)
  .put('/:bucket', controller.upload as (req: Request, res: Response) => void); // Change this later
