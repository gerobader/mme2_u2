/**
 * Created by jonathankofahl on 07.12.16.
 */

"use strict";

var filter = {

    filterQueryFunc: function(query, videoArray) {

        var videos = undefined;
        var offset = query.offset;
        var limit = query.limit;

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
        console.log('limit: ' + query.limit);
        console.log('offset: ' + query.offset);

        // String splitten   Später Abfragen ob alle da
        if(query.filter != undefined ) {
            // Videos um attribute kürzen

            console.log('Array Keys: ' + Object.keys(videos));

            for (var i = 0; i < videos.length && i < limit; i++) {
                var fIndex = i + offset;
                var number = i+1;
                if(fIndex < videos.length){
                    var newVideo = {};
                    if (query.filter.includes('title')) {
                        console.log('-------------------' + number +'. TITLE------------------');
                        console.log(videos[fIndex].title);
                        newVideo.title = videos[fIndex].title;
                    }
                    if (query.filter.includes('src')) {
                        console.log('-------------------' + number + '. SOURCE------------------');
                        console.log(videos[fIndex].src);
                        newVideo.src = videos[fIndex].src;
                    }
                    if (query.filter.includes('description')) {
                        newVideo.description = videos[fIndex].description;
                    }
                    if (query.filter.includes('length')) {
                        newVideo.length = videos[fIndex].length;
                    }
                    if (query.filter.includes('timestamp')) {
                        newVideo.timestamp = videos[fIndex].timestamp;
                    }
                    if (query.filter.includes('playcount')) {
                        newVideo.playcount = videos[fIndex].playcount;
                    }
                    if (query.filter.includes('ranking')) {
                        newVideo.ranking = videos[fIndex].ranking;
                    }
                    filteredVideos[i] = newVideo;
                    newVideo = {};
                }
            }
        }else{
            for(var j = 0; j < videos.length && j < limit; j++){
                var index = j + offset;

                if(index < videos.length){
                    var newVideo2 = {};
                    newVideo2 = videos[index];
                    filteredVideos[j] = newVideo2;
                }
            }
        }

        console.log('-------------------RESULT-----------------');
        console.log(filteredVideos);
        return filteredVideos;
    }

};
module.exports = filter;
