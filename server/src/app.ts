import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import testRoutes from './routes/test.routes';
//import dashboardRoutes from './routes/dashboard.routes';
import productRoutes from './routes/product.routes';
import clientRoutes from './routes/client.routes';
//import expenseRoutes from './routes/expense.routes';
import statusRoutes from './routes/status.routes';
import supplierRoutes from './routes/supplier.routes';
import categoryRoutes from './routes/category.routes';
import roleRoutes from './routes/role.routes';
import userRoutes from './routes/user.routes';
import financeRoutes from './routes/finances.routes';
import authRoutes from './routes/auth.routes';

const app = express();

// Configurations and Middlewares
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/test', testRoutes);
//app.use('/dashboard', dashboardRoutes);
app.use('/products', productRoutes);
app.use('/clients', clientRoutes);
//app.use('/expenses', expenseRoutes);
app.use('/status', statusRoutes);
app.use('/supplier', supplierRoutes);
app.use('/category', categoryRoutes);
app.use('/role', roleRoutes);
app.use('/user', userRoutes);
app.use('/finances', financeRoutes);
app.use('/auth', authRoutes);

export default app;