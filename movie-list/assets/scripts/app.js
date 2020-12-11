const addMovieModal = document.getElementById('add-modal');
const startAddModalBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddModalBtn = addMovieModal.querySelector('.modal__actions').firstElementChild;
const addMovieBtn = cancelAddModalBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const sectionpart = document.getElementById('entry-text');
const movieList = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');
const cancelDeleteBtn = deleteMovieModal.querySelector('.modal__actions').firstElementChild;
const confirmDeleteBtn = cancelDeleteBtn.nextElementSibling;


// console.log(userInputs);

movies = [];

const cancelMovieDeletion = () => {
    deleteMovieModal.classList.remove('visible');
}

const toggleBackdrop = () =>{
    backdrop.classList.toggle('visible');
}

const showMovieModalHandler = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
    clearMovieInputs();
};

const clearMovieInputs = () => {
    for(inputItem of userInputs){
        inputItem.value = '';
    }
}

const addMovieToListHandler = () => {
    const Title =  userInputs[0].value;
    const URL= userInputs[1].value;
    const Rating= userInputs[2].value;
    if (Title.trim() === "" || URL.trim() === "" || Rating.trim() === "" || Rating > 5 || Rating < 1){
        alert("Please enter valid values only.");
    }else{
        const obj = {
            'Id' : Math.random(),
            'Title': Title,
            'URL': URL,
            'Rating': Rating
        };
        movies.push(obj);
        console.log(movies);
        closeMovieModal();
        toggleUI();
        displayMovieElement(obj.Id, Title, URL, Rating);
    }        
};

const toggleUI = () => {
    if(movies.length === 0){ 
        sectionpart.style.display = 'block';
    } else{
        sectionpart.style.display = 'none';
    }
};

const displayMovieElement = (id, name, url, rating) => {
    const listElem = document.createElement('li');
    listElem.className = 'movie-element';
    listElem.innerHTML = `
    <div class='movie-element__image'>
        <img src='${url}' alt='${name}'>
    </div>
    <div class='movie-element__info'>
        <h2>${name}</h2>
        <p>${rating}</p>        
    </div>
    `;
    listElem.addEventListener('click', deleteMovieElement.bind(null, id));
    listRoot = document.getElementById('movie-list');
    listRoot.append(listElem);
};

const deleteMovie = (Mid) => {
    let i;
    // console.log(`Mid is ${Mid}`);
    for(i=0;i<movies.length; i++){
        // console.log(`movies[${i}].Id is ${movies[i].Id}`);
        if (movies[i].Id === Mid){
            // console.log('Match');
            break;
        }
    }
    // console.log(`i is ${i}`);
    movies.splice(i,1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[i].remove();
    deleteMovieModal.classList.remove('visible');
    toggleBackdrop();
}

const deleteMovieElement = (Mid) =>{
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    confirmDeleteBtn.addEventListener('click', deleteMovie.bind(null, Mid));
    
    
    //deleteMovie(Mid);
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
    cancelMovieDeletion();
    toggleBackdrop();
}







startAddModalBtn.addEventListener('click', showMovieModalHandler);
cancelAddModalBtn.addEventListener('click', closeMovieModal);
backdrop.addEventListener('click', closeMovieModal);

addMovieBtn.addEventListener('click', addMovieToListHandler);
cancelDeleteBtn.addEventListener('click', closeMovieModal);

