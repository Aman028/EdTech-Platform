const express = require("express");
const app = express();

const userRoutes = require("./routers/User");
const profileRoutes = require("./routers/Profile");
const paymentRoutes = require("./routers/Payments");
const courseRoutes = require("./routers/Course");
const { payment } = require("./controllers/Payments");
require("dotenv").config();

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const stripe = require("stripe")(
  "sk_test_51PjmIaJSRpFRPQuF5OCOJjWVVqdNf0eX5GtE4yEE6pTZ8rGNOzyVeKYE6gi1HWoHudr8seHPYtowV44CfOSDbfiq00gOgHVJsP"
);
const BASE_URL=process.env.BASE_URL;
const PORT = process.env.PORT || 4000;

//databse connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: `${BASE_URL}`,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);

app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  console.log("aman");
  console.log("amsnn");

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.courseName,
      },
      unit_amount: product.price * 100,
    },
    quantity: 1,
  }));
  console.log("aman2");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${BASE_URL}/dashboard/enrolled-courses`,
    cancel_url: `${BASE_URL}/api/v1/cancel`,
  });
  res.json({ id: session.id });
  console.log("aman3");
});

//default routes
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "your server is up and runnning",
  });
});

app.listen(PORT, () => {
  console.log(`App is runnning at ${PORT}`);
});
