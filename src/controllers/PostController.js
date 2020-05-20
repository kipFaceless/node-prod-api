const mongoose = require('mongoose');

const Post = mongoose.model('Post');

module.exports = {


	async index(req, res){

		const {page = 1} = req.query;

		const posts = await  Post.paginate({}, {limit:10});

		res.json(posts);
		console.log(post);


	},

	async store(req, res) {

	const { originalname: name, size, key, location:url = "" } = req.file;

	const post = await Post.create({
		name,
		size,
		key,
		url,
	});

	return res.json(post);
	console.log(post);
},

	async delete(req, res){

		const post = await Post.findById(req.params.id);

		await post.remove();
		res.send('Post removido com Sucesso!');
	},

};