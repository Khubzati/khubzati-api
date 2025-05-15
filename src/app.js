require("dotenv").config();
const express = require("express");
const { sequelize } = require("./db/models");
const { createApiResponse } = require("./utils/responseHandler");
const enMessages = require("./config/messages/en.json");
const arMessages = require("./config/messages/ar.json");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bakeryRoutes = require("./routes/bakeryRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.json());

// Mount routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bakeries", bakeryRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  try {
    // Ensure data is a plain JavaScript object
    const data = {
      version: "1.0.0"
    };

    // Create response with serializable data
    const response = createApiResponse(
      "Welcome to Khubzati API!",
      "!أهلاً وسهلاً بكم في واجهة برمجة تطبيقات خبزتي",
      data,
      true
    );

    // Send response
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error in root route:', error);
    return res.status(500).json(
      createApiResponse(
        enMessages.INTERNAL_SERVER_ERROR,
        arMessages.INTERNAL_SERVER_ERROR,
        null,
        false
      )
    );
  }
});

app.use("*", (req, res) => {
  res.status(404).json(
    createApiResponse(
      enMessages.NOT_FOUND,
      arMessages.NOT_FOUND,
      null,
      false
    )
  );
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(
    createApiResponse(
      enMessages.INTERNAL_SERVER_ERROR,
      arMessages.INTERNAL_SERVER_ERROR,
      null,
      false
    )
  );
});

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
    await sequelize.sync({ alter: true });
    console.log(`Khubzati API listening on port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database or start server:", error);
    process.exit(1);
  }
});