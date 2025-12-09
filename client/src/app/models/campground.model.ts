export interface Campground {
  _id: string;
  title: string;
  image: string;
  price: number;
  description?: string;
  location?: string;
  reviews?: Review[];
}

export interface Review {
  id: string;
  body: string;
  rating: number;
}
