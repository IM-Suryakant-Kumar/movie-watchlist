const watchList = JSON.parse(localStorage.getItem("watchlist"))
// console.log(watchList.length)

document.body.addEventListener("click", (e) => {
    // console.log(e.target.dataset)
    if(e.target.dataset.wid) {
        console.log(e.target.dataset)
        const idx = watchList.findIndex(movie => movie.imdbID === e.target.dataset.wid)
        watchList.splice(idx, 1)
        localStorage.setItem("watchlist", JSON.stringify(watchList))
        
        render()
    }
    
})

function render() {
    if(watchList.length > 0) {
        document.querySelector(".when-watchlist-empty").classList.add("hidden")
        let moviesHtml = ""
    
        watchList.forEach(({ Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID }) => {
            moviesHtml += `
                <div class="card">
                    <img class="card-img" src="${Poster}" />
                    <div class="card-info">
                        <div>
                            <strong class="title">${Title}</strong><span class="rating"> ⭐ ${imdbRating}</span>
                        </div>
                        <div>
                            <span class="runtime">${Runtime}</span><span class="genre">${Genre}</span><button id="add-to-watchlist" data-wid="${imdbID}"><i class="fa-solid fa-circle-minus"></i> Watchlist</button>
                        </div>
                        <div>
                            <p class="plot">${Plot}</p>
                        </div>
                    </div>
                </div>
            `
        })
        document.getElementById("watchlist-movie-cards").innerHTML = moviesHtml   
    } else {
        document.querySelector(".when-watchlist-empty").classList.remove("hidden")
    }
}

render()