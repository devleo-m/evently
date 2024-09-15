import express from 'express';
import cors from 'cors';
import userRouter from '../routes/userRouter';
import profileRouter from '../routes/profileRoutes';
import swaggerDocument from './swagger.json';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());
app.use(cors());

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Rotas
app.use("/api", userRouter);
app.use("/api", profileRouter);

export default app;