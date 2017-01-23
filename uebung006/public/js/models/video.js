define(["backbone", "underscore"], function(Backbone, _){

var result = {};
var VideoModel = Backbone.Model.extend({
    urlRoot: '/videos',
    idAttribute: '_id',
    defaults: {
        title: null,
        src: null,
        length: null,
        description: '',
        playcount: 0,
        ranking: 0
    },
    initialize: function () {
    },
    validate: function(attr){
        if(!attr.title)
            return "Missing videotitle";
        if(!attr.src)
            return "Missing videosource";
        if(!attr.length)
            return "Missing videolength";
    }
});

var VideoCollection = Backbone.Collection.extend({
    model: VideoModel,
    url: '/videos/',
    initialize: function() {
    }
});

result.Model = VideoModel;
result.Collection = VideoCollection;
return result;
});