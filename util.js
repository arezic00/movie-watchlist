export function movieToHtml(movieObj, saved) {
    return `
    <li class="movie-item">
        <img class="movie-item__img" src="${movieObj.poster}" alt="">
        <div class="movie-item__info">
            <div class="movie-item__info-1">
                <h2 class="movie-item__title">${movieObj.title}</h2>
                <div class="rating">
                    <img src="/images/rating-icon.svg" alt="">
                    <p>${movieObj.rating}</p>
                </div>
            </div>
            <div class="movie-item__info-2">
                <p>${movieObj.runtime}</p>
                <p>${movieObj.genre}</p>
                <div class="watchlist-btn">
                    <img src="${saved ? '/images/remove-icon.svg' : '/images/add-icon.svg'}" alt="${(saved ? 'Remove from ' : 'Add to ') + 'watchlist'}" data-saved="${saved}" data-imdb-id="${movieObj.imdbId}" role="button">
                    <p>${saved ? 'Remove' : 'Watchlist'}</p>
                </div>
            </div>
            <p class="movie-item__plot">${movieObj.plot}</p>
        </div>
    </li>`
}

export function getWatchlist() {
    const watchlist = localStorage['watchlist']
    return watchlist ? JSON.parse(watchlist) : []
}

export function setWatchlist(watchlist) {
    localStorage['watchlist'] = JSON.stringify(watchlist)
}

export function removeMovie(watchlist, imdbId) {
    watchlist.splice(watchlist.indexOf(watchlist.find(it => it.imdbId === imdbId)), 1)
}