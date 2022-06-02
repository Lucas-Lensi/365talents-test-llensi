import expressPlugin from './express.js';

export default async ({ app }) => {
	await expressPlugin({ app });
	console.log('Express Intialized');
};
