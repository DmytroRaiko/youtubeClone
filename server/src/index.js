const express = require('express');
const config = require('./config.js');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users.js');
const commentsRoutes = require('./routes/comments.js');
const videosRoutes = require('./routes/videos.js');
const authRoutes = require('./routes/auth.js');
const errorsMiddleware = require('./middlewars/errors.js');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();

const connect = () => {
  mongoose.connect(config.mongo).then(() => console.log("Connected to db")).catch((err) => console.log(err));
}

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/auth", authRoutes);

app.use(errorsMiddleware);

app.listen(config.appPort, () => {
  connect();
  console.log(`app started at the http://localhost:${5555}/`);
})
