const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const ConnectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
const Emitter = require('events');

const userRoutes = require("./routes/User");
const productRoutes = require("./routes/Product");
const categoryRoutes = require('./routes/Category');
const addressRoutes = require('./routes/Address');
const orderRoutes = require('./routes/Orders');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');

// Connect with Db
ConnectDB();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
	cors({
		credentials:true,
	})
)

// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter);

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

// Settig the routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World").status(200);
});

const server = app.listen(PORT, () => {
  console.log(`Your server is runnig on port ${PORT}`);
});

const io = require("socket.io")(server, {
	cors: {
		origin: "*"
	},
})


io.on("connection", (socket) => {
	console.log("Socket Connected")
	socket.on('join', function (data) {
		socket.join(data.orderId); // We are using room of socket io
		console.log("room join")
	});
})



eventEmitter.on('orderUpdated', (data) => {
    io.in(`${data.id}`).emit('orderUpdated', data);
})

eventEmitter.on('newOrder', (data) => {
    io.in(`${data.id}`).emit('newOrder', data);
})

