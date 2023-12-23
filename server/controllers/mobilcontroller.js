// controllers/mobileController.js
import Mobile from "../models/Mobile.js";
import CartItem from "../models/CartItem.js";

// Get all mobiles
export const getAllMobiles = async (req, res) => {
  try {
    const mobiles = await Mobile.find();
    res.json(mobiles);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchMobiles = async (req, res) => {
  try {
    const { name, type, processor, memory, os, minPrice, maxPrice } = req.query;

    // Build the filter object based on provided query parameters
    const filter = {};
    if (name) filter.name = { $regex: new RegExp(name, 'i') };
    if (type) filter.type = type;
    if (processor) filter.processor = processor;
    if (memory) filter.memory = memory;
    if (os) filter.os = os;
    if (minPrice && maxPrice) filter.price = { $gte: minPrice, $lte: maxPrice };

    const mobiles = await Mobile.find(filter);
    res.json(mobiles);
  } catch (error) {
    console.error('Error searching mobiles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get mobile by ID
export const getMobileById = async (req, res) => {
  const { id } = req.params;
  try {
    const mobile = await Mobile.findById(id);
    if (!mobile) {
      return res.status(404).json({ error: 'Mobile not found' });
    }
    res.json(mobile);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addMobileById =async(req,res)=>{
  const { id } = req.params;

  try {
    const mobile = await Mobile.findById(id);
    if (!mobile) {
      return res.status(404).json({ error: 'Mobile not found' });
    }

    // Check if the mobile is already in the cart
    const existingCartItem = await CartItem.findOne({ name: mobile.name });

    if (existingCartItem) {
      // If the mobile is already in the cart, update the quantity
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      // If the mobile is not in the cart, add a new cart item
      const cartItem = new CartItem({
        name: mobile.name,
        price: mobile.price,
        type: mobile.type,
        processor: mobile.processor,
        memory: mobile.memory,
        os: mobile.os,
        image: mobile.image,
        quantity: 1,
      });

      await cartItem.save();
    }

    // Fetch updated cart items
    const updatedCart = await CartItem.find();
    res.json(updatedCart);
  } catch (error) {
    console.error('Error adding mobile to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllCartItems = async (req, res) => {
  try {
    console.log('Request received for /cart');
    const cartItems = await CartItem.find();
    console.log('Cart items:', cartItems);
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const removeCartItem = async (req, res) => {
  const { name } = req.params;

  try {
    const cartItem = await CartItem.findOneAndDelete({ name });

    if (!cartItem) {
      return res.status(404).json({ error: 'CartItem not found' });
    }

    // Fetch the updated cart and send it to the client
    const updatedCart = await CartItem.find();
    res.json(updatedCart);
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
