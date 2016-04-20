var appendResults = function(item) {

    // .clone() is duplicating
    var allMaterial = $('.results-template:last').clone();

    var songElem = allMaterial.find('.name');
    songElem.text('Song Name: ' + item.name);

    var popElem = allMaterial.find('.popularity');
    popElem.text('Popularity Score: ' + item.popularity);

    var linkElem = allMaterial.find('.linkToSong');
    linkElem.text("Sample The Song").attr('href', item.preview_url);


    var imageElem = allMaterial.find('.artistimage')
    imageElem.attr('src', item.album.images[0].url);

    return allMaterial;
}

var findArtistId = function(answer) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: answer,
            type: 'artist',
        }
    }).

    done(function(response) {
        var artistName = response.artists.items[0].name;
        $('.artistName').text(artistName).addClass('border');
        var artistId = response.artists.items[0].id;
        findTopTracks(artistId, artistName);

    }).

    // jqXHR common syntax? Use fail? Error? Does it matter?
    fail(function(jqXHR, error) { //this waits for the ajax to return with an error promise object
        var errorElem = showError(error);
        $('.results').append(errorElem);
    });



};


var findTopTracks = function(artistId, artistName) {
    console.log(artistName);

    $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks',
        data: {
            country: 'US',
        }
    }).

    done(function(data) {
        $('.artistName').text(data.tracks.name);
        console.log(data.tracks.length);
        $.each(data.tracks, function(i, item) {
            var finalResults = appendResults(item);
            $('.results-container').append(finalResults);

        });
    })

    // fail: (function(jqXHR, error) { //this waits for the ajax to return with an error promise object
    // var errorElem = showError(error);
    // // console.log(errorElem);
    // $('.results').append(errorElem);

    // })


}

$(function() {

    $('.userInput').submit(function(e) {
        e.preventDefault();
        var userTag = $('#query').val();
        $('.results-container').html("");
        findArtistId(userTag);

    })
})
