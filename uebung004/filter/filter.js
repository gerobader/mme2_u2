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

            if(filterArray.indexOf('title') != -1){
                filteredVideos.title = videos[i].title;
            }
            if(filterArray.indexOf('src')!= -1){
                filteredVideos.src = videos[i].src;
            }
            console.log(filteredVideos[i]);

        }
        

        console.log(filteredVideos);
        return filteredVideos;



    }

};
module.exports = filter;
