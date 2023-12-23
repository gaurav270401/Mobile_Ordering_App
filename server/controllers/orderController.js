import Order from '../models/Order.js';

export const addMyorders= async (req, res) => {
  try {
    const orderData = req.body; // Assuming the order data is sent in the request body
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMyorders = async (req,res) =>{

    try {
        console.log('Request received for /cart');
        const orderdata = await Order.find();
        console.log('Cart items:', orderdata);
        res.json(orderdata);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
