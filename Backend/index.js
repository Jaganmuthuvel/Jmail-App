const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors());
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")
const PORT = process.env.PORT || 5000;

// Create a test account or replace with real credentials.
mongoose.set("debug", true);

mongoose.connect("mongodb+srv://jagan:Jagan%402821@jmail.zlj94vq.mongodb.net/passkey?retryWrites=true&w=majority&appName=Jmail",).then(function () {
    console.log("connect to db")
}).catch(function (error) {
    console.log(error)
})
const credentials = mongoose.model("credentials", {}, "jmail")

app.post("/sendmail", async function (req, res) {
    const { msg, file1 } = req.body;
    // console.log(msg)
    // console.log(file1)
    credentials.findOne().then(function (data) {
        console.log("data fetched:", data._id)
        console.log("data.user fetched:", data.toJSON().user)
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: data.toJSON().user,
                pass: data.toJSON().pass,
            },

        });


        new Promise(async function (resolve, reject) {
            try {
                for (var i = 0; i < file1.length; i++) {
                    await transporter.sendMail({
                        from: "jaganusha2828@gmail.com",
                        to: file1[i],
                        subject: "Message from jagan",
                        text: msg
                    })
                    // console.log("msg send to:" + file1[i])
                }
                resolve("Success")

            } catch (error) {
                resolve("Failed")
                console.log(error)

            }
        }).then(function () {
            res.send(true)

        }).catch(function () {
            res.send(false)
        })
    }).catch(function (error) {
        console.log(error)
    })


})
app.listen(PORT, function () {
    console.log("server started")
})
