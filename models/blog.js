const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const crypto = require('crypto');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 160,
            require: true
        },
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        body: {
            type: {},
            min: 10,
            max: 2000000,
        },
        excerpt: {
            type: String,
            max: 1000
        },
        mtitle: {
            type: String,
        },
        mdesc:{
            type: String,
        },
        categories: [{
            type: ObjectId,
            ref: "Category",
            require: true
        }],
        tags: [{
            type: ObjectId,
            ref: "Tag",
            require: true
        }],
        postedBy:{
            type: ObjectId,
            ref: "User"
        },
        photo: {
            data: Buffer,
            contentType: String
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model('Blog', blogSchema);