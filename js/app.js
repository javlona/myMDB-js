import * as constants from './constants.js'
import { singleMovieUrl, movieCard, getGenre, toggler, singleMovie, Storage, creditsUrl } from "./utilities.js"



// fetch popular into cards
async function fetchPopular() {

    try {
        let response = await fetch(constants.popularUrl)
        let popularData = await response.json()

        popularData.results.forEach((item) => {

            let card = movieCard(item.poster_path, item.title, item.release_date, item.vote_average, item.id)
            constants.sliderPopular.innerHTML += card
        })

    } catch (error) {
        console.log(error)
    }

}

var randomMovID;

// fetch now playing random
async function fetchNowPlaying() {
    
    try {
        let response = await fetch(constants.nowPlayingUrl)
        var nowPlayingData = await response.json()
        
        // fetch a random movie from now playing
        randomMovID = nowPlayingData.results[constants.random20].id
        
    } catch (error) {
        console.log(error)
    }
    
    const movieUrl = singleMovieUrl(constants.API_KEY, randomMovID)
    
    try {
        let res = await fetch(movieUrl)
        let movData = await res.json()

        console.log(movData)
        // constants.nowImage.src = constants.imgPath300+movData.poster_path
        // constants.nowTitle.innerHTML = movData.title
        // constants.nowRelYear.innerHTML = movData.release_date
        // constants.nowDuration.innerHTML = movData.runtime + "min"
        // constants.tagline.innerHTML = movData.tagline
        // constants.overview.innerHTML = movData.overview
        // constants.nowGenre.innerHTML = getGenre(movData.genres)

        let movie = singleMovie(movData.poster_path, movData.title, movData.release_date, movData.runtime, movData.tagline, movData.overview, movData.genres)
        constants.nowPlaying.innerHTML = movie
        
        constants.nowPlaying.style = `
        background: linear-gradient(-45deg, rgb(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
        url(${constants.imgPathBig}${movData.backdrop_path}) center center /cover;
        `

    } catch (error) {
        console.log(error)
    }
    
}


// fetch trending into cards
async function fetchTrending() {

    try {
        let response = await fetch(constants.trendingUrl)
        let trendingData = await response.json()
        console.log(trendingData)
        // get fetched data into cards
        trendingData.results.forEach((item) => {
            let card = movieCard(item.poster_path, item.title, item.release_date, item.vote_average, item.id)
            constants.sliderTrending.innerHTML += card
        })

    } catch (error) {
        console.log(error)
    }

}

// save seach value to LocalStorage and open new window
function searchButtonTrigger() {
    if (constants.search.value === "") {
        alert("enter a word")
    } else {
        // save input value to localStorage
        Storage.add("searchWord", constants.search.value)
    
        // open new window
        window.open('/search.html', '_blank')

        //empty input field
        search.value = "";
    }
}

// // open movie on new page
// function movieInfo(e) {
//     e.target.
// }


//like button
document.addEventListener('DOMContentLoaded', function() {
    var likeButton = document.getElementById('like-button');
    likeButton.addEventListener('click', function() {
      window.lb = likeButton;
      likeButton.classList.toggle('selected');
    });
  }, false);
  

// run on click
constants.searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    searchButtonTrigger()
})

// run on enter
constants.search.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {

      searchButtonTrigger()
    }
})

// load cards on DOM
window.addEventListener('load', () => {
    
    fetchNowPlaying()
    fetchPopular()
    fetchTrending()

})


// toggle menu by setting data-visible to true
constants.menuToggle.addEventListener('click', () => toggler())

// open single movie on new page
function goToInfo(id) {
    Storage.add("movie", id)
    window.open("/movie-info.html", "_blank")
}

window.goToInfo = goToInfo;