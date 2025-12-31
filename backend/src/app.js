const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');
const inventoryRoutes = require('./routes/inventory.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
module.exports = app;