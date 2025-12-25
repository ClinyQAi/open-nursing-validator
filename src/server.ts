import express from 'express';
import { setValidatorRoutes } from './routes/validatorRoutes';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config';

const app = express();
const PORT = config.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setValidatorRoutes(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});