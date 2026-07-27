<div align="center">

# 🛍️ Frank & Oak MERN E-Commerce Platform

### Modern Full Stack E-Commerce Web Application

<p align="center">

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>

</p>

<p>

A modern **Full Stack MERN E-Commerce Application** inspired by **Frank & Oak**, built with **Next.js**, featuring secure authentication, OTP verification, Stripe payment integration, Admin Dashboard, and complete CRUD functionality.

</p>

</div>

---

# 📑 Table of Contents

- 📌 Overview
- ✨ Features
- 🛠️ Tech Stack
- 📸 Screenshots
- 📂 Folder Structure
- ⚙️ Installation
- 🔑 Environment Variables
- ▶️ Running the Project
- 🚀 Future Improvements
- 👨‍💻 Author

---

# 📌 Overview

Frank & Oak Clone is a modern Full Stack E-Commerce application developed using the MERN Stack with Next.js. The application provides a complete online shopping experience, allowing users to register, verify their email using OTP, securely log in, browse products, add items to the cart, complete purchases through Stripe, and manage their accounts.

The Admin Dashboard enables administrators to perform complete CRUD operations on products, manage users, process orders, and efficiently control the entire store from a single interface.

---

# ✨ Features

<table>
<tr>

<td valign="top" width="50%">

## 🔐 Authentication & Security

- 👤 User Registration
- 🔑 Secure Login
- 🛡️ JWT Authentication
- 📧 OTP Email Verification
- 🔄 Forgot Password
- 🚪 Protected Routes
- 🔒 Password Encryption
- 🍪 Secure Session Management

</td>

<td valign="top" width="50%">

## 🛒 Shopping Experience

- 🏠 Home Page
- 📦 Product Listing
- 🔍 Product Details
- 🗂️ Product Categories
- 🔎 Advanced Product Search
- ❤️ Wishlist
- 🛍️ Shopping Cart
- 💳 Stripe Payment Integration
- 📋 Order Placement
- 📦 Order History

</td>

</tr>

<tr>

<td valign="top">

## 👨‍💼 Admin Dashboard

- 📊 Dashboard
- ➕ Add Products
- ✏️ Edit Products
- 🗑️ Delete Products
- 👥 Manage Users
- 📦 Manage Orders
- 🔄 Complete CRUD Operations
- 📈 Inventory Management

</td>

<td valign="top">

## 🚀 Performance

- ⚡ Built with Next.js
- ⚛️ React.js Frontend
- 🟢 Node.js Backend
- 🚂 Express.js REST APIs
- 🍃 MongoDB Database
- 📱 Responsive Design
- 🎨 Modern UI
- ♻️ Reusable Components
- 🚀 Optimized Performance

</td>

</tr>

</table>

---

# 🛠️ Tech Stack

<p align="center">

<img src="https://skillicons.dev/icons?i=nextjs" height="60"/>
<img src="https://skillicons.dev/icons?i=react" height="60"/>
<img src="https://skillicons.dev/icons?i=nodejs" height="60"/>
<img src="https://skillicons.dev/icons?i=express" height="60"/>
<img src="https://skillicons.dev/icons?i=mongodb" height="60"/>
<img src="https://skillicons.dev/icons?i=js" height="60"/>
<img src="https://skillicons.dev/icons?i=git" height="60"/>
<img src="https://skillicons.dev/icons?i=github" height="60"/>
<img src="https://skillicons.dev/icons?i=vscode" height="60"/>

</p>

<p align="center">

<img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
<img src="https://img.shields.io/badge/Nodemailer-30B980?style=for-the-badge"/>
<img src="https://img.shields.io/badge/REST_API-02569B?style=for-the-badge"/>
<img src="https://img.shields.io/badge/CRUD-FF6B35?style=for-the-badge"/>

</p>

---

# 📸 Screenshots

> Create a **screenshots** folder in the project root and add your project images using the filenames below.

## 🏠 Home Page

<p align="center">
  <img src="./screenshots/home.jpeg" alt="Home Page" width="100%">
</p>

\

---

## 🛒 Shopping Cart

<p align="center">
  <img src="./screenshots/sc.jpeg" alt="Shopping Cart" width="100%">
</p>

---



---

## 💳 Checkout

<p align="center">
  <img src="./screenshots/stripe.jpeg" alt="Checkout" width="100%">
</p>

---

## 🔐 Login Page

<p align="center">
  <img src="./screenshots/l.jpeg" alt="Login" width="100%">
</p>

---

## 👤 Register Page

<p align="center">
  <img src="./screenshots/r.jpeg" alt="Register" width="100%">
</p>

---

## 📧 OTP Verification

<p align="center">
  <img src="./screenshots/otp.jpeg" alt="OTP Verification" width="100%">
</p>

---

## 👨‍💼 Admin Dashboard

<p align="center">
  <img src="./screenshots/ad.jpeg" alt="Admin Dashboard" width="100%">
</p>

---


---

# 📂 Project Structure

```text
Frank-And-Oak/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── admin/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── screenshots/
│   ├── home.png
│   ├── product-details.png
│   ├── cart.png
│   ├── wishlist.png
│   ├── checkout.png
│   ├── login.png
│   ├── register.png
│   ├── otp.png
│   ├── admin-dashboard.png
│   └── product-management.png
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/kWD36768/my-MERN-Stack-project.git
```

---

## 2️⃣ Navigate to the Project Folder

```bash
cd Frank-And-Oak
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 4️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 5️⃣ Install Admin Panel Dependencies

```bash
cd ../admin
npm install
```

---

# 🔑 Environment Variables

Create a **.env** file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

EMAIL=your_email@gmail.com

EMAIL_PASSWORD=your_email_password

STRIPE_SECRET_KEY=your_stripe_secret_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
```

---

# ▶️ Running the Project

### Start Backend

```bash
cd backend
npm start
```

---

### Start Frontend

```bash
cd frontend
npm run dev
```

---

### Start Admin Panel

```bash
cd admin
npm run dev
```

---

Open your browser:

```text
Frontend : http://localhost:3000

Backend : http://localhost:5000

Admin : http://localhost:3001
```

---

# 📂 Create Screenshots Folder

Run this command in your project root.

```bash
mkdir screenshots
```

Then place all screenshots inside the folder.

Example:

```
screenshots/
│── home.png
│── product-details.png
│── cart.png
│── wishlist.png
│── checkout.png
│── login.png
│── register.png
│── otp.png
│── admin-dashboard.png
└── product-management.png
```

---# 🚀 Deployment

The application can be deployed using the following platforms:

| Service | Platform |
|---------|----------|
| 🌐 Frontend | Vercel |
| ⚙️ Backend API | Render |
| 🗄️ Database | MongoDB Atlas |
| 👨‍💼 Admin Panel | Vercel |

---

# 📡 REST API Features

- 🔐 JWT Authentication
- 📧 OTP Email Verification
- 👤 User Authentication APIs
- 📦 Product CRUD APIs
- 🛒 Cart Management APIs
- 💳 Stripe Payment APIs
- 👨‍💼 Admin APIs

---

# 📈 Project Highlights

✔️ Full Stack MERN Architecture

✔️ Next.js Frontend

✔️ React.js Admin Dashboard

✔️ Node.js & Express.js Backend

✔️ MongoDB Database

✔️ JWT Authentication

✔️ OTP Email Verification

✔️ Stripe Payment Integration

✔️ Complete CRUD Operations

✔️ Secure Backend

✔️ Clean Folder Structure

✔️ Optimized Performance

---

# 🎯 Future Improvements

- 🤖 AI Product Recommendations
- 🌙 Dark Mode
- 🌍 Multi-language Support
- 🔔 Push Notifications
- 📊 Sales Analytics Dashboard
- 💬 Live Chat Support
- 📱 Progressive Web App (PWA)
- ⭐ Product Reviews & Ratings
- 🎁 Discount Coupons
- 📦 Real-Time Order Tracking

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

If you'd like to improve this project:

1. Fork the repository.
2. Create your feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

# ⭐ Show Your Support

If you found this project useful, please consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and motivates future improvements.

---

# 👨‍💻 Author

<div align="center">

## Bilal Khan

### MERN Stack Developer

💻 Passionate about building modern, scalable, and responsive Full Stack web applications using the MERN Stack.

<p align="center">

<a href="www.linkedin.com/in/muhammad-bilal-a00aa7336">
<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

<a href="https://github.com/kWD36768">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="mailto:bilalkhan17216@gmail.com">
<img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/>
</a>

</p>

</div>

---

# 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project for learning and educational purposes.

---

# 🙏 Acknowledgements

Special thanks to the open-source community and the amazing technologies that made this project possible.

- ⚛️ React.js
- ▲ Next.js
- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB
- 💳 Stripe
- 🔐 JWT
- 📧 Nodemailer
- 🐙 Git & GitHub

---

<div align="center">

# ❤️ Thank You for Visiting

### If you like this project, don't forget to leave a ⭐ on GitHub!

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f2027,50:203a43,100:2c5364&height=120&section=footer"/>

### 🚀 Happy Coding!

</div>