const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MCOO275',)
    .then(() => {
        console.log('Connected to MongoDB');
        // Get the database object from the mongoose connection
        db = mongoose.connection.db;
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// product schema
const productSchema = new mongoose.Schema({
    productName: String,
    price: String,
    imageUrl: String
});

// creating the product model
const Product = mongoose.model('Product', productSchema);

// list of the products
const productList = [
    {productName: "Pretzels", price: "$0.40", imageUrl: "images/pretzels.jpeg"},
    {productName: "Bissli", price: "$0.50", imageUrl: "images/bissli.jpeg"},
    {productName: "Cookies", price: "$0.45", imageUrl: "images/cookies.jpeg"},
    {productName: "Corn Pops", price: "$0.35", imageUrl: "images/corn_pops.jpeg"},
    {productName: "Fruit-A-Peel", price: "$0.90", imageUrl: "images/fruit_a_peel.jpeg"},
    {productName: "Grab 1 Bar", price: "$0.90", imageUrl: "images/grab_1_bar.jpeg"},
    {productName: "Popcorn", price: "$0.40", imageUrl: "images/popcorn.jpeg"},
    {productName: "Potato Chips", price: "$0.40", imageUrl: "images/potato_chips.jpeg"},
    {productName: "Rice Cakes", price: "$1.00", imageUrl: "images/rice_cakes.jpeg"},
    {productName: "Tortilla Chips", price: "$0.50", imageUrl: "images/tortilla_chips.jpeg"},
    {productName: "Wafer", price: "$0.50", imageUrl: "images/wafer.jpeg"}
];

for(const product of productList) {
    const newProduct = new Product(product);
    newProduct.save()
        .then((theProduct) => {
            console.log('Product created successfully:', theProduct);
        })
        .catch((err) => console.error('Error performing CRUD operations;', err));
       /* try {
            const newProduct = new Product(product);
            newProduct.save();
            console.log('added to database:', newProduct);
          } catch (err) {
            console.error('Error saving product:', err);
            // Handle specific errors here (optional)
          }*/
}