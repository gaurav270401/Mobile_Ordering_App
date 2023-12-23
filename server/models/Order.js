import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  orderDate: { type: Date, default: Date.now },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  totalAmount: Number,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;