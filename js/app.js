// Not able to traverse the data properly. 
var findArtistId = function(answer) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: answer,
            type: 'artist',
        },

        success: function(response) {
            var artistName = response.artists.items[0].name;
            $('.artistName').text(artistName);
            console.log(artistName);
            var artistId = response.artists.items[0].id;
            findTopTracks(artistId);
        }
    });

};
var findTopTracks = function(artistId) {
    $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks',
        data: {
            country: 'US',
        },

        success: function(data) {
            $('.artistName').text(data.tracks.name);
            $.each(data.tracks, function(i, item) {
                var finalResults = appendResults(item);
                $('.results').append(finalResults);               

            });
        }
    })
};

var appendResults = function(item) {
    
    var allMaterial = $('.results').clone;

    var songElem = $('.results').find('.name');
    songElem.text('Song Name: ' + item.name);

    var popElem = $('.results').find('.popularity');
    popElem.text('Popularity Score: ' + item.popularity);

    var linkElem = $('.results').find('.linkToSong');
    linkElem.attr('href', item.preview_url);

    var imageElem=$('.results').find('.artistimage')
    imageElem.attr('src', item.album.images[0].url);

    return allMaterial;
}

$(function() {

    $('.userInput').submit(function(e) {
        e.preventDefault();
        var userTag = $('#query').val();
        findArtistId(userTag);

    });

});
