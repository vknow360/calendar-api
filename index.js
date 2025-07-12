const express = require('express');
const db = require('./utils/dbconnect');
const dotenv = require('dotenv');
const cors = require('cors');
const calendarRoutes = require('./routes/calendar.route');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.status(200).json({ status: 'OK' });
});

app.use('/api/v1/calendar', calendarRoutes);

db.connect();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers",
    "authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
