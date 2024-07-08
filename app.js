require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./database/connect');
const { PORT } = require('./src/config/appConfig');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
const commentRoutes = require('./src/routes/commentRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

connectDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };  
