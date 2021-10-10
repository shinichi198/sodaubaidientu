require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const yearRouter = require("./routes/year");
const classRouter = require("./routes/lop");
const gradeRouter = require("./routes/grade");
const weekRouter = require("./routes/week");
const subjectRouter = require("./routes/subject");
const dashboardRouter = require("./routes/dashboard");
const lockclassRouter = require("./routes/lockclass");
const cors = require("cors");
//const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8mnom.mongodb.net/blogdev?retryWrites=true&w=majority`;
const URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.8mnom.mongodb.net:27017,cluster0-shard-00-01.8mnom.mongodb.net:27017,cluster0-shard-00-02.8mnom.mongodb.net:27017/blogdev?ssl=true&replicaSet=atlas-tfztw1-shard-0&authSource=admin&retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/years", yearRouter);
app.use("/api/lops", classRouter);
app.use("/api/grades", gradeRouter);
app.use("/api/weeks", weekRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/dashboards", dashboardRouter);
app.use("/api/lockclass", lockclassRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
