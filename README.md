<a id="readme-top"></a>

<div align="center">
  <a href="https://github.com/your_username/YelpCamp">
  </a>

  <h3 align="center">YelpCamp</h3>

  <p align="center">
    A full-stack campground review application built with Angular, Node.js, MongoDB, and MapTiler.
    <br />
    <br />
    <a href="https://yelpcamp-5u6m.onrender.com">View Demo</a>
  </p>
</div>

---

## Table of Contents

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

---

## <a id="#about-the-project"> About The Project </a>

**YelpCamp** is a full-stack web application that allows users to discover, review, and share campgrounds. Users can explore campgrounds, view locations on an interactive map, leave reviews, upload images, and manage their own campground listings through secure, session-based authentication.

This project is built as a learning-focused and showcase-driven full-stack application, designed to deepen and demonstrate my knowledge of Angular, RxJS, and NgRx on the frontend, alongside a Node.js + Express backend and MongoDB for data persistence. It emphasizes reactive data flows, state management, validation, authentication, and real-world application architecture.

**✨ Key features:**

- 🌍 Browse and search campgrounds

- 🗺️ Interactive map with campground locations (Mapbox)

- 👤 User authentication (register / login / logout)

- 🔐 Frontend & backend authentication and authorization

- ✅ Data validation on both frontend (Angular forms) and backend (Mongoose / Joi)

- 🗂️ Session-based authentication with persistent session data

- 🏕️ Create, edit, and delete campgrounds (authenticated users)

- 💬 Add and delete reviews

- 🖼️ Upload campground images (Cloudinary integration)

- 🔐 Route protection (backend middleware)

- 🧪 Demo account for visitors

- 📱 Responsive design (desktop, laptop & mobile)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## <a id="#tech-stack"> 🛠️ Tech Stack </a>
## <a id="#tech-stack"> About The Project </a>

**Frontend**

- Angular (Standalone & modular components)
- NgRx (state management, actions, reducers, effects)
- SCSS with design tokens
- Bootstrap + custom UI styles
- RxJS for reactive data handling

<br>

 **Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js (local strategy)
- Express Session

<br>

**Other Tools**

- MapTiler (maps & clustering)
- Cloudinary (image uploads)
- Render

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

**📂 Project Structure**
```bash
YelpCamp/
client/
│
├── public/
├── src/
│ ├── app/
│ │ ├── components/ # Feature-level components
│ │ │ ├── campground-details/
│ │ │ ├── campgrounds/
│ │ │ ├── home/
│ │ │ └── not-found/
│ │ │
│ │ ├── shared/ # Reusable & UI components
│ │ │ └── components/
│ │ │ ├── campground-map/
│ │ │ ├── dialog-pop/
│ │ │ ├── footer/
│ │ │ ├── header/
│ │ │ ├── reviews/
│ │ │ ├── forms/
│ │ │ ├── loading/
│ │ │ ├── material/
│ │ │ └── user/
│ │ │
│ │ ├── interceptors/ # HTTP interceptors
│ │ ├── models/ # Interfaces & data models
│ │ ├── services/ # API & business logic services
│ │ ├── store/ # NgRx state (actions, reducers, effects)
│ │ │
│ │ ├── app.component.*
│ │ ├── app.config.ts
│ │ └── app.routes.ts
│ │
│ ├── environment/ # Environment configs
│ ├── styles/ # Global styles & design tokens
│ │ ├── tokens/
│ │ ├── stars.scss
│ │ └── tokens.scss
│ │
│ ├── index.html
│ ├── main.ts
│ └── styles.scss
│
├── angular.json
├── package.json
├── tsconfig*.json
│
server/
├── cloudinary/
│ └── index.js # Cloudinary configuration
│
├── controllers/ # Route controllers (business logic)
│ ├── campgroundController.js
│ ├── reviewController.js
│ └── userController.js
│
├── models/ # Mongoose schemas
│ ├── campground.js
│ ├── review.js
│ └── user.js
│
├── routes/ # Express routes
│ ├── campgroundRoutes.js
│ ├── reviewRoutes.js
│ └── userRoutes.js
│
├── seeds/ # Database seed scripts
│ ├── cities.js
│ ├── index.js
│ ├── seedHelpers.js
│ └── users.js
│
├── uploads/ # Temporary uploaded files
│
├── utils/ # Utility helpers
│ └── asyncHandler.js
│
├── .env
├── .gitignore
├── app.js # Express app entry
├── middleware.js # Custom middleware
├── package.json
└── package-lock.json

```

<br>

## 🚀 Getting Started

**Prerequisites**

- Node.js (v18+ recommended)

- MongoDB (local or Atlas)

- Angular CLI

- Node.js
  ```sh
  npm install npm@latest -g
  ```
<br>

## ⚙️ Installation

**1️⃣ Clone the repository**

  ```sh
 git clone https://github.com/Zeras12314/yelpcamp.git
 cd yelpCamp
  ```
<br>

**2️⃣ Backend setup**
  ```sh
cd server
npm install
  ```

Create a .env file inside the server folder:
  ```sh
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
MAPTILER_API_KEY=your_maptiler_key
MONGODB_USERNAME=your_mongo_username
MONGODB_PASSWORD=your_mongo_password
SESSION_SECRET=your_session_secret
  ```

Start the backend server:
  ```sh
npm start
  ```
<br>

**3️⃣ Frontend setup**
  ```sh
cd ../client
npm install
ng serve
  ```
Frontend will run at:
  ```sh
http://localhost:4200
  ```
<br>

## 🔑 Demo Account
For quick access, you can use the demo account:
  ```sh
Username: user
Password: test
  ```

## 🔑 Seeding the Database
To populate the database with sample campgrounds:
  ```sh
cd server
node seeds/index.js
  ```
<br>

## 📱 Responsive Design

- Optimized for desktop, laptop, tablet, and mobile screens

- Height‑aware layouts to prevent content overlap on smaller laptop screens

- Mobile‑first adjustments using width and height media queries

## 📸 Screenshots

![alt text](screen-capture.gif)

![alt text](<Screenshot 2025-12-31 180300.png>)

![alt text](<Screenshot 2025-12-31 180317.png>)


## 🧠 Learning Goals

- This project was built to practice:

- Full‑stack architecture

- RESTful API design

- Authentication & authorization

- Angular state management & observables

- Responsive UI design

- Working with maps and geospatial data

<br>

## 🗺️ Roadmap / Improvements

🔍 Advanced search & filtering

⭐ Campground ratings

🧭 User profiles

🧪 Unit & e2e tests

🌐 Internationalization (i18n)

<br>

## 📄 License

This project is for educational purposes.

🙌 Acknowledgements

- Inspired by Colt Steele’s YelpCamp project

- Map data powered by Mapbox

- UI inspirations from modern outdoor & travel apps

<br>

## 👤 Author

<strong>Gerson Tiongson</strong>
<p>Angular Developer | Full‑Stack Learner</p>