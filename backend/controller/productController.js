import mongoose from 'mongoose';
import Product from '../model/product_model.js';


export const createProduct = async (req, res) =>{
    const product = req.body;
    if(!product.name || !product.price || !product.image){
     return res.status(400).json({
         success: false,
         msg: "Please provide all fields"
     })
    } 
 
    const newProduct = new Product(product)
 
    try {
     await newProduct.save();
     res.status(201).json({
         success: true,
         msg: "Product saved successfully",
         data: newProduct
     })
 
    } catch (error) {
     res.status(500).json({
         msg: `Server error: ${error.message}`
     })
    }
 }

export const deleteProduct = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({
            success: false,
            msg: "Product not found"
        })
    }
    try {
        
     await Product.findByIdAndDelete(id)
     res.status(200).json({
         success: true,
         msg: "Product deleted successfully"
     })
 
    } catch (error) {
        res.status(500).json({
            msg: `Server error: ${error.message}`  
        })
    }
 }

export const updateProduct = async (req, res) =>{
    const {id} = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({
            success: false,
            msg: "Product not found"
        })
    }
    try {
     const newProduct = await Product.findByIdAndUpdate(id, product, {new: true})
     res.status(200).json({
         success: true,
         msg: "Product updated successfully",
         data: newProduct
     })
 
    } catch (error) {
        res.status(500).json({
            msg: `Server error: ${error.message}`  
        })
    }
 }

export const getAllProducts = async (req, res) =>{
    try {
     const product = await Product.find({})
     res.status(200).json({
         success: true,
         data: product
     })
 
    } catch (error) {
        res.status(500).json({
            msg: `Server error: ${error.message}`
        })
    }
 }



