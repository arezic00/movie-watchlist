import { movieToHtml, getWatchlist, setWatchlist, removeMovie } from "/util.js";
const API_KEY = '442bc09'
const BASE_URL = 'https://www.omdbapi.com/'
const searchForm = document.getElementById('search-form')
const startExploring = document.getElementById('start-exploring')
const noMoviesFound = document.getElementById('no-movies-found')
const searchResults = document.getElementById('search-results')
let movies = []
let watchlist = getWatchlist()

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const title = new FormData(searchForm).get('title')
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${title}&type=movie`)
    const data = await response.json()
    startExploring.style.display = 'none'
    if (data['Response'] === 'False') {
        searchResults.style.display = 'none'
        noMoviesFound.style.display = 'block'
        return
    }
    noMoviesFound.style.display = 'none'
    movies = []
    for (const movie of data['Search']) {
        const singleResponse = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}`)
        const singleData = await singleResponse.json()
        movies.push(movieToLocalObj(singleData))
    }
    renderMovies()
    searchResults.style.display = 'block'
})
searchResults.addEventListener('click', (e) => {
    const imdbId = e.target.dataset.imdbId
    if (!imdbId) return

    const saved = e.target.dataset.saved === "true"
    const movie = movies.find(it => it.imdbId === imdbId)
    if (saved) {
        removeMovie(watchlist, imdbId)
    } else {
        watchlist.push(movie)
    }
    setWatchlist(watchlist)
    renderMovies()
})

function movieToLocalObj(movieResponse) {
    return {
        poster: movieResponse['Poster'] !== "N/A" ? movieResponse['Poster'] : '/images/placeholder.png',
        title: movieResponse['Title'],
        rating: movieResponse['Ratings'][0] ? movieResponse['Ratings'][0]['Value'].slice(0, 3) : '-',
        runtime: movieResponse['Runtime'],
        genre: movieResponse['Genre'],
        plot: movieResponse['Plot'],
        imdbId: movieResponse['imdbID']
    }
}

function isSaved(movie) {
    return watchlist.length > 0 && watchlist.some(e => e.imdbId === movie.imdbId)
}

function renderMovies() {
    return searchResults.innerHTML = movies.map(it =>
        movieToHtml(it, isSaved(it))).join('')
}