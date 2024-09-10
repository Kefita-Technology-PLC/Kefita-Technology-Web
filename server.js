const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Blog = require("../backend/models/blog.model")
const blogRoute = require('../backend/routes/blog.route')
const cors = require('cors');
require('dotenv').config(); 

app.use(cors());


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
// app.use(bodyParser.json());


//routes
app.use('/api/blogs', blogRoute)


app.get('/', (req, res)=>{
    res.send("hello from node api server updated")
})


//mongodb connection
// Use a dynamic port, with a default fallback to 3000
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection failed:", err.message);
  });



