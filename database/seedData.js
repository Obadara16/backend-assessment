require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Post = require('../src/models/Post');
const Comment = require('../src/models/Comment');
const { MONGO_URI } = require('../src/config/dbConfig');

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log('Database connected');

    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    console.log('Existing data cleared');

    const users = await User.insertMany([
      { username: 'john_doe', email: 'john@example.com', password: 'password123' },
      { username: 'jane_doe', email: 'jane@example.com', password: 'password123' },
    ]);

    console.log('Users seeded');

    const posts = await Post.insertMany([
      { userId: users[0]._id, title: 'First Post', body: 'This is the first post' },
      { userId: users[1]._id, title: 'Second Post', body: 'This is the second post' },
    ]);

    console.log('Posts seeded');

    await Comment.insertMany([
      { postId: posts[0]._id, userId: users[1]._id, body: 'Great post!' },
      { postId: posts[1]._id, userId: users[0]._id, body: 'Interesting read' },
    ]);

    console.log('Comments seeded');

    console.log('Database seeding completed');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
