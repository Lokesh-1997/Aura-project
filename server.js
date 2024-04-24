const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import CORS middleware


const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Define a POST route to handle form submissions
app.post('/submitform', (req, res) => {
    // Extract form data from the request body
    const { fullName, email, phoneNumber, country, servicesInterested, message } = req.body;

    // Validate form data (you may want to add more thorough validation)
    if (!fullName || !email || !phoneNumber || !country || !servicesInterested || !message) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Your SMTP host
        port: 587, // Your SMTP port
        secure: false, // false for TLS - as a boolean not string - if true TLS requires
        auth: {
            user: '', // Your email address
            pass: 'xpzj nell fykc ombw' // Your app password
        }
    });

    // Setup email data
    const mailOptions = {
        from: 'same email', // Sender address
        to: 'to email', // List of recipients
        subject: 'New form submission', // Subject line
        text: `
            Full Name: ${fullName}\n
            Email: ${email}\n
            Phone Number: ${phoneNumber}\n
            Country: ${country}\n
            Services Interested: ${servicesInterested}\n
            Message: ${message}
        ` // Plain text body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Error submitting form. Please try again later.' });
        }
        console.log('Email sent:', info.response);
        return res.status(200).json({ success: 'Form submitted successfully!' });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
