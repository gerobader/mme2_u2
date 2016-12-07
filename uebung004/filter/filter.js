/**
 * Created by jonathankofahl on 07.12.16.
 */

"use strict";

var filter = {

    filterQueryFunc: function(filterString, videoArray) {

        var query = filterString;
        var videos = videoArray;
        var filteredVideos = [];

        // String splitten   Später Abfragen ob alle da
        var filterArray = query.filter.split(',');
        var offsetArray = query.offset;
        var limit = query.limit;


        console.log("Hallo welt");
        console.log(filterArray);

        // Videos um attribute kürzen
        console.log( Object.keys(videos));

        for(var i = 0; i< videos.length; i++ ){

            if(filterArray.contains('title')){
            }

            filteredVideos[i] = newVideo;


        }








        return filteredVideos;



    }

};
module.exports = filter;
