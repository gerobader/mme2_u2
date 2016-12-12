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
        console.log('------------------FILTER CLASS------------------');
        console.log('Filtering: ');
        console.log('');
        console.log(videos);
        console.log('');
        console.log('by Filter-Attributes: ' + query.filter);
        console.log('limit: ' + query.limit);
        console.log('offset: ' + query.offset);
        console.log('search-keywords: ' + keywords);


        // First we search all the videos who match to the Keywords(for example description)
        // After that we cut the video JSON Objects with the filter
        // If there is no filter but keywords, we search but not filter the videos

        if(keywords.id != undefined || keywords.title != undefined || keywords.description != undefined || keywords.src != undefined || keywords.length != undefined || keywords.timestamp != undefined || keywords.playcount != undefined || keywords.ranking != undefined ) {
            console.log("Searching Keywords");
            console.log(keywords.ranking);

            for (var i = 0; i < videos.length && i < limit; i++) {
                if (videos[i].id == keywords.id || videos[i].title == keywords.title || videos[i].description == keywords.description || videos[i].src == keywords.src || videos[i].length == keywords.length || videos[i].timestamp == keywords.timestamp || videos[i].playcount == keywords.playcount || videos[i].ranking == keywords.ranking) {
                    searchedVideos.push(videos[i]);
                    console.log("found video");
                }
                console.log("searching..");
            }
        } else {
            // if there are no keywoards in the query
            searchedVideos = videos;
            console.log("Zero Keywords");

        }



        // String splitten   Später Abfragen ob alle da
        if(query.filter != undefined ) {
            // Videos um attribute kürzen

            console.log('Array Keys: ' + Object.keys(searchedVideos));

            for (var i = 0; i < searchedVideos.length && i < limit; i++) {
                var fIndex = i + offset;
                var number = i+1;
                if(fIndex < searchedVideos.length){
                    var newVideo = {};
                    if (query.filter.includes('title')) {
                        console.log('-------------------' + number +'. TITLE------------------');
                        console.log(searchedVideos[fIndex].title);
                        newVideo.title = searchedVideos[fIndex].title;
                    }
                    if (query.filter.includes('src')) {
                        console.log('-------------------' + number + '. SOURCE------------------');
                        console.log(searchedVideos[fIndex].src);
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




        console.log('-------------------RESULT-----------------');
        console.log(filteredVideos);
        return filteredVideos;
    }

};
module.exports = filter;