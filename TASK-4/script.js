const progress = document.getElementById("progress");
const song = document.getElementById("song");
const ctrlIcon = document.getElementById("ctrlIcon");
const thumbnail = document.getElementById("thumbnail");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const volume = document.getElementById("volume");

const splash = document.getElementById('splash-screen');
const startBtn = document.getElementById('start-btn');
const mainContainer = document.querySelector('.container');
const welcomeText = document.querySelector('.welcome-text');

// Exact file paths based on your VS Code sidebar
const songs = [
    { title: "Pretty Little Baby", artist: "The Toffee", src: "music/Pretty Little Baby.mp4", thumb: "thumb/Pretty Little Baby.jpeg" },
    { title: "Shape of You", artist: "Ed Sheeran", src: "music/Shape Of You.mp4", thumb: "thumb/Shape Of You.jpeg" },
    { title: "Lovely", artist: "Billie Eilish & Khalid", src: "music/lovely.mp4", thumb: "thumb/lovely.jpeg" },
    { title: "Little Fairy", artist: "Lullaby World", src: "music/Little Fairy.mp4", thumb: "thumb/Little Fairy.jpeg" },
    { title: "Dracula Song", artist: "Transylvania Theme", src: "music/Dracula.mp4", thumb: "thumb/Dracula.jpeg" }
];

let songIndex = 0;

// Initialize metadata immediately
loadSong(songIndex);

// --- SPLASH SCREEN TIMER ---
setTimeout(() => {
    welcomeText.style.display = 'none';
    startBtn.style.display = 'block';
}, 7000);

startBtn.addEventListener('click', () => {
    splash.style.opacity = '0';
    setTimeout(() => {
        splash.style.display = 'none';
        mainContainer.classList.remove('blurred');
        
        // Start playback once user interacts
        song.play();
        ctrlIcon.classList.replace("fa-play", "fa-pause");
    }, 1000);
});

// --- PLAYER FUNCTIONS ---
function loadSong(index) {
    title.innerText = songs[index].title;
    artist.innerText = songs[index].artist;
    thumbnail.src = songs[index].thumb;
    song.src = songs[index].src;
    song.load();
}

function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.classList.replace("fa-play", "fa-pause");
    } else {
        song.pause();
        ctrlIcon.classList.replace("fa-pause", "fa-play");
    }
}

song.ontimeupdate = () => {
    if (!isNaN(song.duration)) {
        progress.max = song.duration;
        progress.value = song.currentTime;
        let curMin = Math.floor(song.currentTime / 60);
        let curSec = Math.floor(song.currentTime % 60);
        document.getElementById("current-time").innerText = `${curMin}:${curSec < 10 ? '0'+curSec : curSec}`;
    }
};

song.onloadedmetadata = () => {
    let durMin = Math.floor(song.duration / 60);
    let durSec = Math.floor(song.duration % 60);
    document.getElementById("duration-time").innerText = `${durMin}:${durSec < 10 ? '0'+durSec : durSec}`;
};

progress.oninput = () => { song.currentTime = progress.value; };
volume.oninput = () => { song.volume = volume.value; };

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    song.play();
    ctrlIcon.classList.replace("fa-play", "fa-pause");
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    song.play();
    ctrlIcon.classList.replace("fa-play", "fa-pause");
}

// Automatically play next song when one ends
song.onended = nextSong;