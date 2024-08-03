import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: [30, "Must have less than 30 characters"], // validation  = make requirement
        minlength: [3, "Must have at least 3 characters"],
    },
    price:{
        type: Number,
        required: true,
        max: [12, 'Must be less than 12 '],
        min: [3, 'Must be at least 3 ']
    },
    image:{
        type: String,
        required: true,
    }
},{
    timestamps: true, // create at, update at
})


const Product = mongoose.model('Product', productSchema);

export default Product;