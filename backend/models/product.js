import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String, 
        required: true
    }
}, {
    timestamps: true // createAt, updatedAt
});

const Product = mongoose.model('Product', productSchema); // Creating a collection named 'Product' using the defined schema: name, price, image.
// We name it "Product" and Mongoose will automatically look for the plural, lowercased version of your model name. 

export default Product;