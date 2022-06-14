import express from 'express';
import setupMiddlewares from './use-middlewares';
import setRoutes from './use-routes';

const app = express();
setupMiddlewares(app);
setRoutes(app);
export default app;
