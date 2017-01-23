define(["backbone", "underscore", "jquery"], function(Backbone, _, $){
    var VideoView = Backbone.View.extend({
        tagName: 'div',
        className: 'videoSpace',
        template: _.template($('#video-template').text()),
        render: function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
        }
    });
    return VideoView;
});