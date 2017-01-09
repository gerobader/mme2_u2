/**
 * Created by jonathankofahl on 07.12.16.
 */

"use strict";

var filter = {

    filterQueryFunc: function(query, videoArray) {

        var videos = undefined;
        var offset = query.offset;
        var limit = query.limit;
        var keywords = query.keywords;

        if(Object.prototype.toString.call(videoArray) === '[object Array]') {
            videos = videoArray;
        } else {
            videos = [videoArray];
        }

        var searchedVideos = [];
        var filteredVideos = [];
        
        // First we search all the videos who match to the Keywords(for example description)
        // After that we cut the video JSON Objects with the filter
        // If there is no filter but keywords, we search but not filter the videos

        if(keywords.id != undefined || keywords.title != undefined || keywords.description != undefined || keywords.src != undefined || keywords.length != undefined || keywords.timestamp != undefined || keywords.playcount != undefined || keywords.ranking != undefined ) {

            for (var k = 0; k < videos.length && k < limit; k++) {
                if (videos[k].id == keywords.id || videos[k].title == keywords.title || videos[k].description == keywords.description || videos[k].src == keywords.src || videos[k].length == keywords.length || videos[k].timestamp == keywords.timestamp || videos[k].playcount == keywords.playcount || videos[k].ranking == keywords.ranking) {
                    searchedVideos.push(videos[k]);
                }
            }
        } else {
            // if there are no keywoards in the query
            searchedVideos = videos;
        }



        // String splitten   Später Abfragen ob alle da
        if(query.filter != undefined ) {
            // Videos um attribute kürzen;

            for (var i = 0; i < searchedVideos.length && i < limit; i++) {
                var fIndex = i + offset;
                var number = i+1;
                if(fIndex < searchedVideos.length){
                    var newVideo = {};
                    if (query.filter.includes('title')) {
                        newVideo.title = searchedVideos[fIndex].title;
                    }
                    if (query.filter.includes('src')) {
                        newVideo.src = searchedVideos[fIndex].src;
                    }
                    if (query.filter.includes('description')) {
                        newVideo.description = searchedVideos[fIndex].description;
                    }
                    if (query.filter.includes('length')) {
                        newVideo.length = searchedVideos[fIndex].length;
                    }
                    if (query.filter.includes('timestamp')) {
                        newVideo.timestamp = searchedVideos[fIndex].timestamp;
                    }
                    if (query.filter.includes('playcount')) {
                        newVideo.playcount = searchedVideos[fIndex].playcount;
                    }
                    if (query.filter.includes('ranking')) {
                        newVideo.ranking = searchedVideos[fIndex].ranking;
                    }
                    filteredVideos[i] = newVideo;
                    newVideo = {};
                }
            }
        }else{
            for(var j = 0; j < searchedVideos.length && j < limit; j++){
                var index = j + offset;

                if(index < videos.length){
                    var newVideo2 = {};
                    newVideo2 = searchedVideos[index];
                    filteredVideos[j] = newVideo2;
                }
            }
        }

        var result = {
            videos: filteredVideos,
                emptyCheck : false
        };

        if(filteredVideos.length == 0){
            result.emptyCheck = true;
        }
        
        return result;
    }

};
module.exports = filter;