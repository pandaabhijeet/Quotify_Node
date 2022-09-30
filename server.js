const express = require('express');
const dbConnect = require('./config/dbConnection');

const quotifyApp = express();
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

dbConnect;

quotifyApp.use(express.json());
//middleware route:
quotifyApp.use('/api/user', authRoutes);
quotifyApp.use('/api/post', postRoutes);

quotifyApp.listen(3000, () => console.log('Server is Up and Running !'));