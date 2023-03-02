const counter = document.querySelector('.counter');
const button = document.querySelector('.counter-btn');
let imgURL = 'https://image.tmdb.org/t/p/w500';


let count = 0;

button.addEventListener('click', () => {
    count++;
    counter.innerText = count;
    console.log(count)
});

const promise1 = fetch('https://api.themoviedb.org/3/list/1?api_key=4e02ee41f18b6000a79c719f36533b0a');
const promise2 = fetch('https://api.themoviedb.org/3/list/2?api_key=4e02ee41f18b6000a79c719f36533b0a');
const promise3 = fetch('https://api.themoviedb.org/3/list/3?api_key=4e02ee41f18b6000a79c719f36533b0a');

Promise.all([promise1, promise2, promise3]).then((results) => {
    // let promise1 = results[0].json();
    // let promise2 = results[1].json();
    // let promise3 = results[2].json();
    let promises = results.map((result) => result.json());

    Promise.all(promises).then((allData) => {
        for (let i = 0; i < allData.length; i++) {
            let data = allData[i];
            // declare variables with destructuring
            let { items: movies, name: rowTitle } = data;
            //create a div that will contain the row
            let row = document.createElement('div');
            //gife row element a classname of "row"
            row.classList.add("row");
            //create an h4 for the row title
            let title = document.createElement('h3');
            //set the innertext of the row title(data.name)
            title.innerText = rowTitle;
            // create a div to hold poster images
            let imagesContainer = document.createElement('div');
            //assign class of images-container to the row
            imagesContainer.classList.add('images-container')

            // loop through movies array 
            for (let i = 0; i < 9; i++) {
                //assign curr movie in array
                let movie = movies[i];
                // create image element 
                let image = document.createElement('img');
                //pull in image src from curr movie array
                image.src = imgURL + movie.poster_path;
                //append image to imagesContainer
                imagesContainer.append(image);
            }
            //append title to the row div
            row.append(title)
            // append imagesContainer to row div
            row.append(imagesContainer)
            //append the entire row div to the main section
            document.querySelector('main').append(row)
        }
    });
});

