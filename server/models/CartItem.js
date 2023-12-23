import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type:{
    type : String,
    required : true,
  },
  processor:{
    type : String,
    required : true,
  },
  memory:{
    type : String,
    required : true,
  },
  os:{
    type : String,
    required : true,
  },
  image:{
    type : String,
    required : true,
  },
  quantity: {
    type: Number,
    default: 1, // Set the default quantity to 1
  },

});

const CartItem = mongoose.model('CartProduct', cartItemSchema);

export default CartItem;