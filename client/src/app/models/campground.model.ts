export interface Campground {
  _id: string;
  title: string;
  images: { url: string; filename?: string }[];
  price: number;
  description?: string;
  location?: string;
  geometry?: Geometry;
  author: Author;
  reviews: Review[];
}

export interface Review {
  _id: string;
  body: string;
  rating: number;
  author?: Author;
}

export interface Author {
  _id: string;
  username: string;
  email: string;
}

export interface Geometry {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}
