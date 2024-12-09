import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Routes
app.use('/products', productRoutes);

export default app;