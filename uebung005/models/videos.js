var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoModel = new Schema({

    title: {type: String, required: true},
    description: {type: String, default: ''},
    src: {type: String, required: true},
    length: {type: Number, required: true, min: 0},
    playcount: {type: Number, default: 0, min: 0},
    ranking: {type: Number, default: 0, min: 0}
    }, {
    timestamps: {type: String, createdAt: 'timestamp'},
    id: {type: Number, createdAt: 'id'}
});

var Video = mongoose.model('Video', VideoModel);

module.exports = Video;