var findArtistId = function(answer) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: answer,
            type: 'artist',
        },

        success: function(response) {
            var artistId = response.artists.items[0].id;
            findTopTracks(artistId);
        }
    });

    var findTopTracks = function(artistId) {
        $.ajax({
            url: 'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks',
            data: {
                country: 'US',
            },

            success: function(data) {
                $.each(data, function(i, item) {
                    var finalResults = appendResults(item);
                    console.log(data.item);
                    $('.results').append(finalResults);


                });
            }
        })
    };

};

var appendResults = function(value) {
    var allMaterial = $('.results').clone;

    var nameElem = $('.results').find('.name');
    // nameElem.text(value.popularity);
    
    var popElem = $('.results').find('.popularity');
    popElem.text('');

    var linkElem = $('.results').find('.linkToSong');
    linkElem.attr('href', );
    
    return allMaterial;
}

$(function() {

    $('.userInput').submit(function(e) {
        e.preventDefault();
        var userTag = $('#query').val();
        findArtistId(userTag);

    });

});
