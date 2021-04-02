import config from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import journalRoutes from './server/routes/JournalRoutes.js';
import userRoutes from './server/routes/UserRoutes.js';

config.config()

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsOptions))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const port = process.env.PORT || 8000;

app.use('/api/v1/journals', journalRoutes)
app.use('/api/v1/users', userRoutes)

// when server boots up
app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
   message: 'Welcome to this API.',
   success: true
}));

export default app;
