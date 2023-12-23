import CartItem from "../models/CartItem.js";

// Handle changing quantity
export const changeQuantity = async (req, res) => {
    const { name } = req.params;
    const { action } = req.body;
  
    try {
      const cartItem = await CartItem.findOne({name});
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
  
      // Update the quantity based on the action
      if (action === 'increment') {
        cartItem.quantity += 1;
      } else if (action === 'decrement' && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }
  
      await cartItem.save();
  
      // Fetch updated cart items
      const updatedCart = await CartItem.find();
      res.json(updatedCart);
    } catch (error) {
      console.error('Error changing quantity:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
