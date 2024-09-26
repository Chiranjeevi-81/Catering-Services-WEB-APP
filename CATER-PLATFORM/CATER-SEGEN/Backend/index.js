const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const jwt = require('jsonwebtoken');


// middleware
app.use(cors());
app.use(express.json());




mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cater-segen-2.1uelm82.mongodb.net/`
  )
  .then(console.log("Mongodb connected successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB: " + error));

// jwt authentication

// jwt related api
app.post("/jwt", async (req, res) => {
  const user = req.body;
  // console.log(user)
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

// import routes
const menuRoutes = require("./api/routes/menuRoutes");
app.use("/menu", menuRoutes);

const cartsRoutes = require("./api/routes/cartRoutes");
app.use("/carts", cartsRoutes);

const usersRoutes = require("./api/routes/userRoutes");
app.use("/users", usersRoutes);

const paymentRoutes = require("./api/routes/paymentRoutes");
app.use("/payments", paymentRoutes);

const adminStats =  require('./api/routes/adminStats');
app.use('/admin-stats', adminStats);

 const orderStats = require('./api/routes/orderStats')
app.use('/order-stats', orderStats);

const buffetRoutes = require("./api/routes/buffetRoutes");
app.use("/buffet", buffetRoutes);

// payment methods routes
const verifyToken = require('./api/middlewares/verifyToken')

app.post("/create-payment-intent",verifyToken, async (req, res) => {
  const { price } = req.body;
  const amount = price*100;
  // console.log(amount);

  
  // Create a PaymentIntent 
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", (req, res) => {
  res.send("CATER-SEGEN is Running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
