define(["backbone", "underscore"], function(Backbone, _){

var result = {};
var VideoSchema = {
    urlRoot: '/videos',
    idAttribute: "_id",
    defaults: {
        description : "",
        playcount : 0,
        ranking : 0
    },
    initialize: function () {
    },
    validate: function(attr){
        if(_.isEmpty(attr.title))
            return "title not there";
        if(_.isEmpty(attr.length))
            return "no length";
        if(_.isEmpty(attr.src))
            return "no src";
    }
};

var VideoModel = Backbone.Model.extend(VideoSchema);

result.Model = VideoModel;
result.Collection = VideoCollection;
return result;
});