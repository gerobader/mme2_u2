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

            var newVideo = {};
            if(filterArray.includes('title')){
                newVideo.title = videos[i].title;
            }
            if(filterArray.includes('src')){
                newVideo.src = videos[i].src;
            }
            if(filterArray.includes('description')){
                newVideo.description = videos[i].description;
            }
            if(filterArray.includes('length')){
                newVideo.length = videos[i].length;
            }
            if(filterArray.includes('timestamp')){
                newVideo.timestamp = videos[i].timestamp;
            }
            if(filterArray.includes('playcount')){
                newVideo.playcount = videos[i].playcount;
            }
            if(filterArray.includes('ranking')){
                newVideo.ranking = videos[i].ranking;
            }

            console.log(newVideo);

            filteredVideos[i] = newVideo;
            newVideo = {};

        }

/*
        for(var i = offset; i< limit; i++ ){

            new




        }

*/





            return filteredVideos;



    }

};
module.exports = filter;
