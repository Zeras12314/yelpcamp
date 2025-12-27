const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors, images } = require("./seedHelpers");
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
const sampleImages = (arr, count) =>
  [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "69415f35e0535c1c6d6c9078",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: `https://picsum.photos/400?random=${Math.random()}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores possimus facere officia dicta a adipisci, voluptatum, iure itaque, atque perferendis eos.",
      price,
      images: sampleImages(images, Math.floor(Math.random() * 3) + 1),
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
