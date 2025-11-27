import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // Importing the function to connect to the database.
import path from "path";

import productRoutes from "./routes/product.route.js";

dotenv.config();
//console.log(process.env.MONGO_URI); // Accessing the MONGO_URI environment variable, connecting the database.

const app = express();

const PORT = process.env.PORT || 5001; // Using the PORT environment variable or defaulting to 5001 (hardcoded).

const __dirname = path.resolve();

app.use(express.json()); // Middleware to parse JSON request bodies.

app.use("/api/products", productRoutes); // Using the product routes for any requests to /api/products.

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB(); // Calling the function to connect to the database when the server starts.
  console.log(`Server started at http://localhost:${PORT}`);
});
