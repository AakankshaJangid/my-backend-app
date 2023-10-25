const express = require('express');
const db = require('./src/models');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

db.sequelize.sync().then(() => {
    console.log("Database connected successfully");
}).catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const userRoute = require('./src/routes/user.route');
app.use('/api/v1', userRoute); 

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
