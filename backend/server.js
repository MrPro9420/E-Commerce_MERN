import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import DBconnect from './config/db.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.status(200).send('API is running');
})


const PORT = process.env.PORT || 5001;

DBconnect();

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})