export interface Campground {
  _id: string;
  title: string;
  image: string;
  price: number;
  description?: string;
  location?: string;
  author: Author;
  reviews: Review[];
}

export interface Review {
  _id: string;
  body: string;
  rating: number;
  author?: Author
}

export interface Author {
  _id: string;
  username: string;
  email: string;
}
