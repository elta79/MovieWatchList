const searchButton = document.getElementById("search-button")
const movieInput = document.getElementById("movie-input")
const articleEl = document.getElementById("article")
const placeholderEl = document.getElementById("placeholder")

async function renderMovie(data){
    articleEl.innerHTML=""
    const movieSearchArray = []

    for(movie of data.Search){
        //this is to get the info for each title returned by the movie search
        const movieRes = await fetch(`http://www.omdbapi.com/?t=${movie.Title}&apikey=52d8a576&`)
        const movieData =await movieRes.json()
        const {Title, Plot, Genre, Ratings, Runtime, Poster} = movieData
               
        //render data to DOM
        articleEl.innerHTML += `
            <section>
                <div class="movie-outer-container">
                    <img src="${Poster}">
                    <div class="movie-inner-container">
                        <div class="tier1-container">
                            <h2 id="movie-title">${Title}</h2>
                            <p id="movie-rating">${Ratings[0].Value}   IMDB</p>
                        </div>
                        <div class="tier2-container">
                            <p id="movie-runtime">${Runtime}</p>
                            <p id="movie-genre">${Genre}</p>                                
                            <p class="add-button">  
                                <img id="button-icon" src="plus.png">
                                Watchlist
                            </p>                                
                            
                        </div>
                        <p class="movie-plot" id="movie-plot">${Plot}</p>
                    </div>
                </div>                
            </section> 
        `
        movieSearchArray.push(movieData)
    }

    // event listener using event delegation
    articleEl.addEventListener("click", function (e){

        if (e.target.classList.contains("add-button")){

            // find parent section of clicked element
            const movieSection = e.target.closest("section")

            // get index of clicked section 
            const index = Array.from(movieSection.parentNode.children).indexOf(movieSection)

            // retrieve data obj from index
            const selectedMovieData = movieSearchArray[index]

            // set to local storage
            let prevStorage = localStorage.getItem('storedMovie')
            if(prevStorage === null){
                const storageArray = [selectedMovieData]
                console.log("local storage empty")
                localStorage.setItem('storedMovie', JSON.stringify(storageArray))
            }else{
                console.log("local storage has stuff")
                prevStorage = JSON.parse(prevStorage)
                localStorage.setItem('storedMovie', JSON.stringify(prevStorage.concat(selectedMovieData)))
            }            
        }
    })
    
}

searchButton.addEventListener("click", async () => {
    const res = await fetch(`http://www.omdbapi.com/?s=${movieInput.value}*&apikey=52d8a576&`)
    const data = await res.json()
        placeholderEl.remove()
        renderMovie(data)
        movieInput.value = ""

})

