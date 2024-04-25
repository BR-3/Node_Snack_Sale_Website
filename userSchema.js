const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/MCOO275',)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// define the user schema
const userSchema = new mongoose.Schema({
    name: String,
    streetNumber: String,
    streetName : String,
    city: String,
    state: String,
    zip: Number,
    phone: String,
    email: String,
    chinuch: String,
    confCode: String,
    createdAt: {type: Date, default: Date.now }
});

// create the user model
const User = mongoose.model('User', userSchema);

// create new user
const newUser = new User({
    name: "Bluma Rodkin",
    streetNumber: "613",
    streetName: "B. 9th St.",
    city: "Far Rockaway",
    state: "NY", 
    zip:"11691",
    phone: "7189562345",
    email: "brodkin@gmail.com",
    chinuch: "Kollel",
    confCode: "11111"
});
newUser.save()
    .then((user) => {
        console.log('User created successfully:', user);
        mongoose.connection.close();
    })



/*
// Save the new user to the database
newUser.save()
    .then((user) => {
    console.log('User created successfully:', user);

    // Find and update the user
    return User.findOneAndUpdate({ username: 'john_doe' }, { age: 30 }, { new: true });
    })
    .then((updatedUser) => {
    console.log('User updated successfully:', updatedUser);

    // Find and delete the user
    return User.findOneAndDelete({ username: 'john_doe' });
    })
    .then((deletedUser) => {
    console.log('User deleted successfully:', deletedUser);

    // Close the MongoDB connection
    mongoose.connection.close();
    })
    .catch((err) => console.error('Error performing CRUD operations:', err));
    */