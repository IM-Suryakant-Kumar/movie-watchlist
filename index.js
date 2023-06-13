const movies = []
const watchList = []

document.body.addEventListener("click", (e) => {
    // console.log(e.target.dataset)
    if(e.target.dataset.id) {
        watchList.push(movies.find(movie => movie.imdbID === e.target.dataset.id))
        localStorage.setItem("watchlist", JSON.stringify(watchList))
    }
    
})

document.getElementById("search-btn").addEventListener("click", async () => {
    const inputValue = document.getElementById("search-input").value
    if(inputValue) {    
        const res = await fetch(`https://www.omdbapi.com/?t=${inputValue}&apikey=e998c5f3`)
        const data = await res.json() 
            
        const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID } = data
        
        movies.push({ Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID })
        render()
    } else {
        document.querySelector(".when-main-empty").innerHTML = `
            <div>
                <p>Unable to find what you’re looking for. Please try another search.</p>
            </div>
        `
    }
})

function render() {
    document.querySelector(".when-main-empty").classList.add("hidden")
    
    let moviesHtml = ""
    
    movies.forEach(({ Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID }) => {
        moviesHtml += `
            <div class="card">
                <img class="card-img" src="${Poster}" />
                <div class="card-info">
                    <div>
                        <strong class="title">${Title}</strong><span class="rating"> ⭐ ${imdbRating}</span>
                    </div>
                    <div>
                        <span class="runtime">${Runtime}</span><span class="genre">${Genre}</span><button id="add-to-watchlist" data-id="${imdbID}"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                    </div>
                    <div>
                        <p class="plot">${Plot}</p>
                    </div>
                </div>
            </div>
        `
    })
    document.getElementById("movie-cards").innerHTML = moviesHtml
}