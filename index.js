const express = require("express");
const cors = require("cors")
require("dotenv").config();
const port = process.env.PORT || 5000
const app = express()
const os=require("os")
const userRoute = require("./Routes/user.route")
const dbconection = require("./config/dbconection")
const aboutAndPrivacyRoute = require("./Routes/aboutAndPrivacy.route")
const bannerRoute = require("./Routes/banner.route")
const categoryRoute = require("./Routes/category.route")
const emailSendRoute = require("./Routes/emailSend.route")
const notificationRoute = require("./Routes/notification.route")
const messageRoute = require("./Routes/message.route")
const paymentRoute = require("./Routes/payment.route")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dburl = process.env.DB_URL

dbconection(dburl);
//initilizing socketIO
const http = require('http');
const socketIo = require('socket.io');



//const socketIOPort = process.env.SOCKET_IO_PORT
// server.listen(socketIOPort, '192.168.10.13', () => {
//   console.log(`Socket is listening on port: ${socketIOPort}`);
// });

app.use("/api/auth/", userRoute);
app.use("/api/", aboutAndPrivacyRoute)
app.use("/api/", bannerRoute)
app.use("/api/", categoryRoute)
app.use("/api/", notificationRoute)
app.use("/api/", emailSendRoute)
app.use('/api/messages', messageRoute)
app.use('/api/payment', paymentRoute)



app.use('/upload/image', express.static(__dirname + '/upload/image/'));

app.get("/",(req,res)=>{
   res.json({message:"its working in vercel"})
})

app.use((err, req, res, next) => {
  //console.error("error tushar",err.message);
  res.status(500).json({ message: err.message });
});

const server=app.listen(port,'192.168.10.13', () => {
  console.log(`Server running on port ${port}`);
  console.log(os.availableParallelism())
});


//const server = http.createServer(app);
const io = socketIo(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*"
  }
});

const socketIO = require("./helpers/socketIO");
socketIO(io);

global.io = io

// app.listen(port,'192.168.10.13',() => {
//   console.log(`server running in ${port}`)
//   console.log("ok all right everything")
// })