const articleEl = document.getElementById("article")
const storedMovieData = localStorage.getItem('storedMovie')


function renderWatchlist(){

    const selectedMovieArray = []

    if(storedMovieData){

        const selectedMovie = JSON.parse(storedMovieData)

        for(let i=0; i<selectedMovie.length; i++){
            
            articleEl.innerHTML += `
            <section>
                <div class="movie-outer-container">
                    <img src="${selectedMovie[i].Poster}">
                    <div class="movie-inner-container">
                        <div class="tier1-container">
                            <h2 id="movie-title">${selectedMovie[i].Title}</h2>
                            <p id="movie-rating">${selectedMovie[i].Ratings[0].Value} IMDB</p>
                        </div>
                        <div class="tier2-container">
                            <p id="movie-runtime">${selectedMovie[i].Runtime}</p>
                            <p id="movie-genre">${selectedMovie[i].Genre}</p>                                
                            <p class="remove-button">  
                                <img id="button-icon" src="minus.png">
                                Remove
                            </p>  
                        </div>
                        <p class="movie-plot" id="movie-plot">${selectedMovie[i].Plot}</p>
                    </div>
                </div>                
            </section> 
            `
            selectedMovieArray.push(selectedMovie[i])            
            
        }
        }else{
            articleEl.innerHTML = `<h2>No movies yet</h2>`
        }
                
    articleEl.addEventListener("click", function (e){

        if (e.target.classList.contains("remove-button")){

            const movieSection = e.target.closest("section")

            const index = Array.from(movieSection.parentNode.children).indexOf(movieSection)

            //remove selected movie from array
            selectedMovieArray.splice(index, 1)

            //update localstorage
            localStorage.setItem('storedMovie', JSON.stringify(selectedMovieArray))

            //remove section from DOM
            movieSection.remove()
        }
        
    })
        
}
renderWatchlist()
