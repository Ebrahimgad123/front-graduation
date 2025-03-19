# TRAVMATE 📌📌

## OVERVIEW
TravMate is an advanced travel companion application designed to enhance the travel experience by allowing users to book professional tour guides, explore destinations, and handle payments seamlessly. The app ensures a smooth authentication process using Google login.

## FEATURES
- **Tour Guide Booking**: Users can search for and book expert tour guides for their trips.
- **Location Browsing**: Discover various travel destinations, landmarks, and points of interest.
- **Secure Payments**: Integrated payment solutions to ensure safe and hassle-free transactions.
- **Google Authentication**: Enables users to sign in effortlessly using their Google accounts.
- **User Dashboard**: A personalized dashboard for managing bookings, payments, and preferences
- **Reviews & Ratings**: Users can leave feedback and rate tour guides for better recommendations.

## TECH STACK
- **Frontend**: Next.js (App Router for navigation and rendering)
- **Backend**: Node.js with Express.js for handling API requests
- **Database**: MongoDB for scalable and efficient data storage
- **Authentication**: passportjs Authentication (Google Sign-in for secure login)
- **Payment Integration**: Stripe for handling transactions securely
- **Hosting & Deployment**:
  - **Frontend**: Vercel for fast and scalable hosting
  - **Backend**: Hosted on Vercel
  - **Database**: MongoDB Atlas for cloud-based data management

## GETTING STARTED
### PREREQUISITES
- Ensure **Node.js** is installed on your system.
- Set up a **MongoDB** instance (either locally or using MongoDB Atlas).
- Have access to Firebase for authentication and Stripe for payments.

### INSTALLATION
#### 1. Clone the Repository
```sh
 git clone (https://github.com/Ebrahimgad123/front-graduation)
 cd travmate
```

#### 2. Install Dependencies
```sh
npm install
```

#### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=8080
MONGO_URI=
NODE_ENV=
JWT_SECRET=
STRIPE_KEY=
# auth-google
GOOGLE_CLIENT_ID=
GOOGLE_SECRET_ID=
CALLBACK_URL=
COOKIE_KEY=

```

#### 4. Run the Development Server
```sh
npm run dev
```

### RUNNING THE BACKEND
#### 1. Navigate to the Backend Directory
```sh
cd backend
```

#### 2. Install Dependencies
```sh
npm install
```

#### 3. Start the Server
```sh
npm start
```

## API ENDPOINTS
| METHOD | ENDPOINT | DESCRIPTION |
|--------|---------|-------------|
| POST | `/api/auth/google` | Authenticate users via Google |
| POST | `/api/login` | Log in users with email and password |
| POST | `/api/register` | Register new users |
| GET | `/api/places` | Fetch available travel locations |
| POST | `/api/booking` | Book a tour guide |
| POST | `/api/payment` | Process payment transactions |

## DEPLOYMENT
- **Frontend Deployment**: Hosted on **Vercel** for fast and scalable performance.
- **Backend Deployment**: Can be hosted on **Vercel, AWS, or Heroku**.
- **Database**: Uses **MongoDB Atlas** for cloud-based, highly scalable storage.

## CONTRIBUTING
We welcome contributions! Feel free to open **issues**, submit **pull requests**, or suggest **improvements** to make TravMate even better.

## LICENSE
This project is licensed under the **MIT License**, allowing open collaboration and usage.

---

**TravMate - Your Ultimate Travel Companion! 🌍✈️**

