const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerUsername: { type: String, required:true },
        likes: { type: Number, required:true },
        dislikes: { type: Number, required:true },
        views: { type: Number, required:true },
        comments: { type: [Object], required:false },
        publishedDate: { type: String, required: false  }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
