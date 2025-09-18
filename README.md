📧 Jmail-App

A full-stack mail sending application built with React (frontend), Node.js + Express (backend), and MongoDB Atlas for storing credentials.
The app allows you to send emails to multiple recipients using Nodemailer.

🚀 Features

React frontend with simple form for entering:

Company Name

Location

Pincode

Message

Recipient emails

Backend built with:

Express.js (API handling)

Mongoose (MongoDB connection)

Nodemailer (for sending mails via Gmail SMTP)

MongoDB Atlas for storing user credentials (email + app password).

Deployment:

Frontend → Vercel

Backend → Render

🛠️ Tech Stack

Frontend: React, Vite, Formik, Axios
Backend: Node.js, Express.js, Nodemailer, Mongoose
Database: MongoDB Atlas
📝 Example Usage

Fill the frontend form → Enter message + recipient emails.

Click Submit.

Backend retrieves credentials from MongoDB.

Nodemailer sends mail to all recipients.

Logs confirm delivery.

⚠️ Notes

Make sure you enable “App Passwords” in Gmail (if using Gmail SMTP).

Ensure your IP is whitelisted in MongoDB Atlas.

Always use process.env.PORT for deployment (not fixed ports).
