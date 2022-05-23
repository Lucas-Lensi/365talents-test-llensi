import expressPlugin from './express.js';
import mongoosePlugin from './mongoose.js';

export default async ({ app }) => {
  mongoosePlugin();
  console.log('MongoDB Intialized');

  await expressPlugin({ app });
  console.log('Express Intialized');
};
