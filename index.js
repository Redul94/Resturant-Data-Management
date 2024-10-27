const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const morgan= require('morgan');
const test = require("./routes/test");
const auth = require("./routes/authroute");
const user = require('./routes/userroute');
const resturant = require('./routes/resturantRoute');
const  mongoose  = require("mongoose");

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/test',test);
app.use('/api/auth',auth);
app.use('/api/user',user);
app.use('/api/resturant',resturant);

mongoose.connect('mongodb://localhost/foodapp')
 .then(console.log('Conneted to the db...'))
 .catch(err =>console.log('Could not conneted to db.....',err));

app.get("/", (req, res) => {
  res.send("welcome to node js project");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
