const mongoose = require("mongoose");
const cities = require("./cities");
const {
  places,
  descriptors,
  images,
  users,
  reviews,
} = require("./seedHelpers");
const Campground = require("../models/campground");
const Review = require("../models/review")

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
    const user = sample(users);
    const camp = new Campground({
      author: user.id,
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

    // Seed random number of reviews (0 to 5) for this campground
    const numberOfReviews = Math.floor(Math.random() * 4);
    for (let j = 0; j < numberOfReviews; j++) {
      const author = sample(users);
      const review = new Review({
        body: sample(reviews), // array of review text
        rating: Math.floor(Math.random() * 3) + 3, // 1-5
        author: author.id,
      });
      await review.save();
      camp.reviews.push(review._id);
    }
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
