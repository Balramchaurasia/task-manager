import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './src/routes/index.js';
import { connectDB } from './src/config/mongoConnection.js';

const app = express();


app.use(helmet());
app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB()



app.use('/api/v1', router);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});


app.listen(8080, () => console.log('Server running at http://localhost:8080'));

