🛒 E-Commerce MERN Stack Project

A full-featured E-Commerce web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). This project demonstrates modern full-stack development practices including authentication, product management, shopping cart functionality, and order processing.

🚀 Features
👤 User Features
User Registration and Login
JWT-based Authentication
Browse Products
Search and Filter Products
Product Details Page
Add to Cart
Update Cart Quantity
Remove Items from Cart
Checkout Process
Order History
Responsive Design
🛠️ Admin Features
Admin Login
Add/Edit/Delete Products
Manage Orders
Manage Users
Dashboard Analytics
🏗️ Technology Stack
Frontend
React
React Router
Axios
Tailwind CSS or Bootstrap
Context API / Redux Toolkit
Backend
Node.js
Express.js
MongoDB
Mongoose
JSON Web Token
bcrypt
dotenv
CORS
Development Tools
Visual Studio Code
Postman
GitHub
Git

📁 Project Structure
E-Commerce_MERN/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── .env
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── .env
│ └── package.json
│
├── README.md
└── .gitignore

ENVIRONMENTAL VARIABLES:
PORT=
MONGO_DB_URL =
JWT_SECRET=

Running the Project

To run this project, first clone the repository and open the project folder in your terminal.

git clone https://github.com/MrPro9420/E-Commerce_MERN.git
cd E-Commerce_MERN
Backend Setup

Navigate to the backend folder and install all required dependencies.

cd backend
npm install

Create a .env file inside the backend directory and add the required environment variables.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development

Start the backend server using the following command.

npm run dev

The backend API will start on http://localhost:5000.

Frontend Setup

Open a new terminal, navigate to the frontend folder, and install the dependencies.

cd frontend
cd E-com
npm install

If your frontend uses environment variables, create a .env file and specify the backend API URL.

VITE_API_URL=http://localhost:5000/api

Start the frontend development server.

npm run dev

The frontend application will be available at http://localhost:5173.

Quick Start

Run the backend and frontend in two separate terminals.

# Terminal 1

cd backend
npm run dev

# Terminal 2

cd frontend
cd E-com
npm run dev

Once both servers are running, open http://localhost:5173 in your browser to use the application.
