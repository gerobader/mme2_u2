/**
 * Created by jonathankofahl on 07.12.16.
 */

"use strict";

var filter = {

    filterQueryFunc: function(filterString, videoArray) {

        var query = filterString;

        var videos = undefined;

        if(Object.prototype.toString.call(videoArray) === '[object Array]') {
            videos = videoArray;
        } else {
            videos = [videoArray];
        }

        var filteredVideos = [];
        console.log('------------------FILTER CLASS------------------');
        console.log('Filtering: ');
        console.log('');
        console.log(videos);
        console.log('');
        console.log('by Attributes: ' + query.filter);

        // String splitten   Später Abfragen ob alle da
        if(query.filter != undefined ) {

            var filterArray = query.filter.split(',');
            var offsetArray = query.offset;
            var limit = query.limit;

            // Videos um attribute kürzen

            console.log('Array Keys: ' + Object.keys(videos));

            for (var i = 0; i < videos.length; i++) {

                var newVideo = {};

                if (filterArray.includes('title')) {
                    console.log('-------------------TITLE------------------');
                    console.log(videos[i].title);
                    newVideo.title = videos[i].title;
                }
                if (filterArray.includes('src')) {
                    console.log('-------------------SOURCE------------------');
                    console.log(videos[i].src);
                    newVideo.src = videos[i].src;
                }
                if (filterArray.includes('description')) {
                    newVideo.description = videos[i].description;
                }
                if (filterArray.includes('length')) {
                    newVideo.length = videos[i].length;
                }
                if (filterArray.includes('timestamp')) {
                    newVideo.timestamp = videos[i].timestamp;
                }
                if (filterArray.includes('playcount')) {
                    newVideo.playcount = videos[i].playcount;
                }
                if (filterArray.includes('ranking')) {
                    newVideo.ranking = videos[i].ranking;
                }

                filteredVideos[i] = newVideo;
                newVideo = {};

            }
        }
        console.log('-------------------RESULT-----------------');
        console.log(filteredVideos);
        return filteredVideos;
    }

};
module.exports = filter;
