define(["backbone", "underscore", "jquery", "views/video"], function(Backbone, _, $, VideoView){
    var VideoListView = Backbone.View.extend({
        el: '#videoSector',
        render: function () {
            this.$el.empty();
            this.collection.each(function (video) {
                var videoView = new VideoView({model: video});
                this.$el.prepend(videoView.render().$el);
            }, this);
            return this;
        },
        initialize: function () {
            this.listenTo(this.collection, 'add', this.render);
        }
    });
    return VideoListView;
});