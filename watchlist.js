import { movieToHtml, getWatchlist, setWatchlist, removeMovie } from "/util.js"
const searchResults = document.getElementById('search-results')
const emptyWatchlist = document.getElementById('empty-watchlist')
let watchlist = getWatchlist()
renderWatchlist()
searchResults.addEventListener('click', (e) => {
    const imdbId = e.target.dataset.imdbId
    if (imdbId) {
        removeMovie(watchlist, imdbId)
        setWatchlist(watchlist)
        renderWatchlist()
    }
})

function renderWatchlist() {
    emptyWatchlist.style.display = watchlist.length > 0 ? 'none' : 'flex'
    searchResults.innerHTML = watchlist.map(it =>
        movieToHtml(it, true)).join('')
}