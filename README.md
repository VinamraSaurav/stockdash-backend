# StockDash Backend

StockDash Backend is a Node.js/Express server that provides authentication, user management, and financial data APIs. It connects to MongoDB for user registration and login, and integrates with the Yahoo Finance API (via RapidAPI) to fetch financial data and generate candlestick charts for frontend visualization.

## 🚀 Features

- **User Authentication**: Secure login and signup using JWT authentication.
- **MongoDB Integration**: Stores user credentials securely.
- **Stock Market Data**: Fetches financial data for Nifty, Sensex, and top 10 companies.
- **Candlestick Chart Data**: Provides historical stock market data for chart visualization.
- **Protected Routes**: Implements JWT-based authentication middleware.

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **External API**: Yahoo Finance (via RapidAPI)
- **Environment Management**: dotenv

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/VinamraSaurav/stockdash-backend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd stockdash-backend
   ```
3. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   API_SECRET=<your-rapidapi-key>
   ```
5. Start the development server:
   ```sh
   node index.js  # or nodemon index.js (if using nodemon)
   ```

## 🔗 API Endpoints

### **Authentication**
- `POST /api/auth/login` → User login (returns JWT token)
- `POST /api/auth/signup` → User signup (registers a new user)

### **Stock Market Data**
- `GET /api/nifty_sensex` → Fetches real-time Nifty and Sensex stock data
- `GET /api/topCompanies` → Fetches data for top 10 companies (HDFCBANK, INFY, TCS, ONGC, etc.)

### **Candlestick Chart Data**
- `GET /api/chartData` → Fetches historical stock data for chart visualization

### **Protected Routes**
- `GET /api/dashboard` → Returns user-specific dashboard data (JWT required)

## 📄 Folder Structure
```
stockdash-backend/
│-- controllers/     # Business logic for authentication & chart data
│-- middleware/      # Middleware for authentication
│-- routes/          # API route definitions
│-- models/          # Mongoose schema for users
│-- config/          # Database connection
│-- .env             # Environment variables
│-- index.js         # Main entry point
│-- package.json     # Project dependencies
```

## 🏗 Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push the branch and create a PR.

## 📞 Contact
For any inquiries, contact [Vinamra Saurav](https://github.com/VinamraSaurav).

