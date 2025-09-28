const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

const connect = mongoose.connect(
  "mongodb+srv://chickentaba01:EuTu2XiQsURoSsk9@cluster0.rbvedxm.mongodb.net/YelpCamp?retryWrites=true&w=majority&appName=Cluster0"
);

connect
  .then(() => {
    console.log("MongoDB Successfully Connected");
    app.listen(port, () => {
      console.log(`Server running on Port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
