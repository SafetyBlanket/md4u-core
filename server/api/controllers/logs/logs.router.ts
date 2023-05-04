import express from 'express';
import controller from './logs.controller';
export default express.Router().get('/:group/:stream', controller.list);
