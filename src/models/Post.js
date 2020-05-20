const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const { promisify } = require('util');

const mongoosePaginate = require('mongoose-paginate');

const PostSchema = new mongoose.Schema({
	name: String,
	size: Number,
	key: String,
	url: String,
	createdAt:{
		type: Date,
		default: Date.now,
	},
});



PostSchema.pre("save", function(){
	if (!this.url) {
		this.url = `${process.env.APP_URL}/files/${this.key}`;
	}
} );

PostSchema.pre("remove", function(){
	if (process.env.STORAGE_TYPE === "local") {
		

		return promisify(fs.unlink)(
			path.resolve(__dirname,  "tmp", "uploads", this.key));
	}
	
});

/*
PostSchema.pre("remove", function(){
	if (process.env.STORAGE_TYPE === "s3") {
		return s3
		.deleteObject({
			Bucket: "uploadexample2",
			Key: this.key

		})
		.promise();
	} else {

		return promisify(fs.unlink)(path.resolve(__dirname, '..', 'tmp', 'uploads', this.key));
	}
})

*/



PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);