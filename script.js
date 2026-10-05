// ===============================
// MUSIC WAVE
// ===============================

const songs = [
    {
        title: "Pop Dreams",
        artist: "Music Wave",
        category: "pop",
        duration: "3:45"
    },
    {
        title: "Rock Night",
        artist: "Music Wave",
        category: "rock",
        duration: "4:12"
    },
    {
        title: "Bachata Love",
        artist: "Music Wave",
        category: "bachata",
        duration: "3:58"
    },
    {
        title: "Summer Beat",
        artist: "Music Wave",
        category: "summer",
        duration: "3:32"
    }
];


let currentSong = 0;
let isPlaying = false;
let progress = 0;

let favorites = JSON.parse(
    localStorage.getItem("musicWaveFavorites")
) || [];


// ===============================
// ELEMENTOS
// ===============================

const currentTitle =
    document.getElementById("currentTitle");

const currentArtist =
    document.getElementById("currentArtist");

const duration =
    document.getElementById("duration");

const playButton =
    document.getElementById("playButton");

const progressBar =
    document.getElementById("progressBar");

const favoriteButton =
    document.getElementById("favoriteButton");

const favoriteCount =
    document.getElementById("favoriteCount");

const miniCover =
    document.getElementById("miniCover");


// ===============================
// CARGAR CANCIÓN
// ===============================

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;
    duration.textContent = song.duration;

    progress = 0;
    progressBar.value = 0;

    updateFavoriteButton();
    updateCover(song.category);
}


// ===============================
// REPRODUCIR
// ===============================

function playSong(index) {

    loadSong(index);

    isPlaying = true;

    playButton.textContent = "❚❚";
}


// ===============================
// PAUSAR / REPRODUCIR
// ===============================

function togglePlay() {

    isPlaying = !isPlaying;

    if (isPlaying) {
        playButton.textContent = "❚❚";
    } else {
        playButton.textContent = "▶";
    }
}


// ===============================
// SIGUIENTE
// ===============================

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    playSong(currentSong);
}


// ===============================
// ANTERIOR
// ===============================

function previousSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    playSong(currentSong);
}


// ===============================
// FAVORITOS
// ===============================

function toggleFavorite() {

    if (favorites.includes(currentSong)) {

        favorites = favorites.filter(
            index => index !== currentSong
        );

    } else {

        favorites.push(currentSong);
    }

    localStorage.setItem(
        "musicWaveFavorites",
        JSON.stringify(favorites)
    );

    updateFavoriteButton();
    updateFavoriteCount();
}


function updateFavoriteButton() {

    if (favorites.includes(currentSong)) {
        favoriteButton.textContent = "♥";
    } else {
        favoriteButton.textContent = "♡";
    }
}


function updateFavoriteCount() {

    favoriteCount.textContent = favorites.length;
}


// ===============================
// CAMBIAR PORTADA
// ===============================

function updateCover(category) {

    const colors = {
        pop: "linear-gradient(135deg, #5c0b17, #e50914)",
        rock: "linear-gradient(135deg, #101010, #555)",
        bachata: "linear-gradient(135deg, #65122e, #d12b64)",
        summer: "linear-gradient(135deg, #8b3100, #e68a00)"
    };

    miniCover.style.background =
        colors[category] || "#e50914";
}


// ===============================
// FILTROS
// ===============================

const filterButtons =
    document.querySelectorAll(".filter");

const cards =
    document.querySelectorAll(".music-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        let visibleCards = 0;

        cards.forEach(card => {

            const category =
                card.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {

                card.style.display = "block";
                visibleCards++;

            } else {

                card.style.display = "none";
            }
        });

        document.getElementById("noResults")
            .style.display =
            visibleCards === 0
                ? "block"
                : "none";
    });

});


// ===============================
// BÚSQUEDA
// ===============================

const searchInput =
    document.getElementById("searchInput");

searchInput.addEventListener("input", searchMusic);


function searchMusic() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    let visibleCards = 0;

    cards.forEach(card => {

        const title =
            card.dataset.title.toLowerCase();

        const artist =
            card.dataset.artist.toLowerCase();

        if (
            title.includes(search) ||
            artist.includes(search)
        ) {

            card.style.display = "block";
            visibleCards++;

        } else {

            card.style.display = "none";
        }
    });

    document.getElementById("noResults")
        .style.display =
        visibleCards === 0
            ? "block"
            : "none";
}


// ===============================
// BOTÓN DE BÚSQUEDA
// ===============================

document
    .getElementById("searchBtn")
    .addEventListener("click", searchMusic);


// ===============================
// SCROLL
// ===============================

function scrollToSection(sectionId) {

    document
        .getElementById(sectionId)
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ===============================
// YOUTUBE MUSIC
// ===============================

function openYouTube() {

    window.open(
        "https://music.youtube.com/",
        "_blank"
    );
}


// ===============================
// BARRA DE PROGRESO
// ===============================

progressBar.addEventListener("input", () => {

    progress = progressBar.value;

});


// Simulación del progreso

setInterval(() => {

    if (!isPlaying) return;

    progress++;

    if (progress >= 100) {

        progress = 0;
        nextSong();
    }

    progressBar.value = progress;

}, 2000);


// ===============================
// ATAJOS DE TECLADO
// ===============================

document.addEventListener("keydown", event => {

    if (event.code === "Space") {

        event.preventDefault();
        togglePlay();

    }

    if (event.code === "ArrowRight") {
        nextSong();
    }

    if (event.code === "ArrowLeft") {
        previousSong();
    }

});


// ===============================
// INICIO
// ===============================

loadSong(0);
updateFavoriteCount();
