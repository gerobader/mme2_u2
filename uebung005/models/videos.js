var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoModel = new Schema({

    id: { type: String, createdAt: 'id'},
    title: { type: String, required: true},
    description: { type: String, default: ''},
    src: { type: String, required: true},
    length: { type: Number, required: true},
    timestamp: { type: String, createdAt: 'timestamp'},
    playcount: { type: Number, default: 0},
    ranking: { type: Number, default: 0}

});

module.exports = mongoose.model('Video', VideoModel);