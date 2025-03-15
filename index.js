const MUSICPLAYLIST = [
  {
    posterUrl:
      "https://cdn.pixabay.com/audio/2025/02/19/22-25-20-336_200x200.png",
    title: "Gardens - Stylish Chill",
    year: 2002,
    artist: "penguinmusic",
    musicPath: "./assests/audios/gardens-stylish-chill-303261.mp3",
  },
  {
    posterUrl:
      "https://cdn.pixabay.com/audio/2024/12/02/06-03-18-487_200x200.png",
    title: "Spinning Head",
    year: 2022,
    artist: "Gvidon",
    musicPath: "./assests/audios/spinning-head-271171.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-3.jpg",
    posterUrl:
      "https://cdn.pixabay.com/audio/2024/05/24/15-24-57-666_200x200.png",
    title: "Flow",
    year: 2022,
    artist: "No Spirit x  juniorodeo",
    musicPath: "./assests/audios/flow-211881.mp3",
  },
  {
    posterUrl:
      "https://cdn.pixabay.com/audio/2024/11/05/15-20-35-725_200x200.png",
    title: "Tell Me The Truth",
    year: 2022,
    artist: "Denys_Brodovskyi",
    musicPath: "./assests/audios/tell-me-the-truth-260010.mp3",
  },
  {
    posterUrl:
      "https://cdn.pixabay.com/audio/2024/04/14/22-20-51-951_200x200.jpg",
    title: "For Her Chill Upbeat Summel Travel",
    year: 2022,
    artist: "Lidérc",
    musicPath:
      "./assests/audios/for-her-chill-upbeat-summel-travel-vlog-and-ig-music-royalty-free-use-202298.mp3",
  },
  {
    posterUrl:
      "https://cdn.pixabay.com/audio/2024/04/12/08-26-11-87_200x200.jpg",
    title: "Groovy Ambient Funk",
    year: 2022,
    artist: "moodmode",
    musicPath:
      "./assests/audios/for-her-chill-upbeat-summel-travel-vlog-and-ig-music-royalty-free-use-202298.mp3",
  },
];

//
/**
 *
 * load all the songs in the playlist
 */
const playlist = document.querySelector("[data-playlist]");
MUSICPLAYLIST.forEach((song, idx) => {
  playlist.innerHTML += `  <li id="play_list_item" data-playlistitem= ${idx} class="playlist_item">	
            <div class="img-container">
              <img
                src=${song.posterUrl}
                alt=""
              />
            </div>
            <div class="song_details">
              <p >${song.title}</p>
              <p>
                <span class="material-symbols-outlined"> artist </span
                ><span>${song.artist}</span>
              </p>
            </div>
          </li>`;
});

/**
 * REUSEABLE FUNCTIIONS FOR  EVENTS LISTINERS
 *
 */

function addEvent(element, event, callback) {
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener(event, callback);
  }
}
/**
 *
 * hide and show the playlist
 */

const playlist_buttons = document.querySelectorAll("[data-queue]");
const playlist_items = document.querySelector("[data-items]");
const playlist_overlay = document.querySelector("[data-playlistoverlay]");
const playlist_back_btn = document.querySelector("[data-arrow-back]");

addEvent(playlist_buttons, "click", () => {
  playlist_overlay.classList.add("showplaylist");
  playlist_items.classList.add("animate__slideInUp");
  playlist_items.classList.remove("animate__slideInDown");
});

playlist_back_btn.addEventListener("click", () => {
  playlist_overlay.classList.remove("showplaylist");
  playlist_items.classList.remove("animate__slideInUp");
  playlist_items.classList.add("animate__slideInDown");
});

/**
 *
 * UPDATE SONGS PLAYER WHEN A USER CLICKS ON THE PLAYLIST ITEMS
 */
let currentSong = 0;
const audio = new Audio();
let interval;
/**
 * INITAL SONG TO PLAYER
 */
window.addEventListener("load", () => {
  const poster = document.querySelector("[data-posterurl]");
  const bodybg = document.getElementsByTagName("body");
  const songTitle = document.querySelector("[data-song-title]");
  const songArtist = document.querySelector("[data-song-artist]");
  poster.src = MUSICPLAYLIST[currentSong].posterUrl;
  audio.src = MUSICPLAYLIST[currentSong].musicPath;

  poster.alt = MUSICPLAYLIST[currentSong].title;
  bodybg[0].style.backgroundImage = `url(${MUSICPLAYLIST[currentSong].posterUrl})`;
  songTitle.textContent = MUSICPLAYLIST[currentSong].title;
  songArtist.textContent = MUSICPLAYLIST[currentSong].artist;
});

function updatePlayer(songobj) {
  const bodybg = document.getElementsByTagName("body");
  const poster = document.querySelector("[data-posterurl]");
  const songTitle = document.querySelector("[data-song-title]");
  const songArtist = document.querySelector("[data-song-artist]");
  const play_btn = document.querySelector("[data-play]");
  const pause_btn = document.querySelector("[data-pause]");
  bodybg[0].style.backgroundImage = `url(${songobj.posterUrl})`;

  poster.src = songobj.posterUrl;
  poster.alt = songobj.title;
  audio.src = songobj.musicPath;
  audio.play();
  songTitle.textContent = songobj.title;
  songArtist.textContent = songobj.artist;
  play_btn.classList.add("hidden");
  pause_btn.classList.remove("hidden");
  let interval = setInterval(updateSeekwhileplaying, 500);
}

/**
 *
 * Add event to audio element
 */
const totaltime = document.querySelector("[data-totaltime]");
audio.addEventListener("loadedmetadata", () => {
  seek.max = audio.duration;
  totaltime.textContent = formatTime(audio.duration);
});

const playlist_item = document.querySelectorAll("[data-playlistitem]");
playlist_item.forEach((item) => {
  item.addEventListener("click", () => {
    currentSong = item.dataset.playlistitem;
    updatePlayer(MUSICPLAYLIST[currentSong]);
    playlist_overlay.classList.remove("showplaylist");
    playlist_items.classList.remove("animate__slideInUp");
    playlist_items.classList.add("animate__slideInDown");
  });
});

/**
 *
 * this funnction is responsible for playing the music and pausing the musinc
 */

const play_btn = document.querySelector("[data-play]");
const pause_btn = document.querySelector("[data-pause]");
function play() {
  if (audio.paused) {
    audio.play();
    play_btn.classList.add("hidden");
    pause_btn.classList.remove("hidden");
    interval = setInterval(updateSeekwhileplaying, 500);
  }
}

function pause() {
  console.log(audio.paused);
  if (!audio.paused) {
    audio.pause();
    play_btn.classList.remove("hidden");
    pause_btn.classList.add("hidden");
    clearInterval(interval);
  }
}
play_btn.addEventListener("click", play);

pause_btn.addEventListener("click", pause);

/**
 *
 * function for the duration
 */

function formatTime(duration) {
  let min = Math.floor(duration / 60);
  let sec = Math.ceil(duration - min * 60);

  return `${min}:${sec < 10 ? `0${sec}` : sec}`;
}

const runningTime = document.querySelector("[data-runningTIme]");
const seek = document.querySelector("#input_range");
const inputfill = document.querySelector("[data-fill]");
function updateSeekwhileplaying() {
  seek.value = audio.currentTime;
  runningTime.textContent = formatTime(audio.currentTime);
  const fillpercentage = (seek.value / seek.max) * 100;
  inputfill.style.width = `${Math.ceil(fillpercentage)}%`;
  if (audio.ended) {
    inputfill.style.width = "0%";
    if (isrepeat) {
      audio.currentTime = 0;
      audio.play();
    } else {
      Nextbutton();
    }
  }
}

function updateseek(e) {
  const inputfill = document.querySelector("[data-fill]");
  const value = e.target.value;
  const max = e.target.max;
  audio.currentTime = value;
  runningTime.textContent = formatTime(value);
  const filperentage = (value / max) * 100;
  inputfill.style.width = `${Math.ceil(filperentage)}%`;
}

seek.addEventListener("input", updateseek);

/**
 *
 * NEXT AND PREVIOUS BUTTONS
 */

const nextButton = document.querySelector("[data-next]");
const previousButton = document.querySelector("[data-prev]");
function Nextbutton() {
  if (isShuffle) {
    shufflecurrent();
    console.log(generaterandomNumber());
  } else {
    currentSong++;
    if (currentSong > MUSICPLAYLIST.length - 1) {
      currentSong = 0;
    }
  }
  updatePlayer(MUSICPLAYLIST[currentSong]);
}

nextButton.addEventListener("click", Nextbutton);
function Prevbutton() {
  if (isShuffle) {
    shufflecurrent();
  } else {
    if (currentSong == 0) {
      currentSong = MUSICPLAYLIST.length - 1;
    } else {
      currentSong--;
    }
  }

  updatePlayer(MUSICPLAYLIST[currentSong]);
}

previousButton.addEventListener("click", Prevbutton);

/**
 * shuffle
 *
 * shuffle the song when it is toggleed on
 *
 */

const generaterandomNumber = () =>
  Math.floor(Math.random() * MUSICPLAYLIST.length);
const shuffleButton = document.querySelector("[data-shuffle]");
let isShuffle = false;

const shufflecurrent = () => (currentSong = generaterandomNumber());

console.log(currentSong);

const shuffleMusic = () => {
  shuffleButton.classList.toggle("shuffle-active");
  isShuffle = isShuffle ? false : true; // toggle the shuffle
};

shuffleButton.addEventListener("click", shuffleMusic);

/**
 *  REAPEAT
 *
 * repeat the currentt song when user click on repeat
 *
 */

const repeatButton = document.querySelector("[data-repeat]");
let isrepeat = false;
function toggleRepeat() {
  repeatButton.classList.toggle("repeat-active");
  isrepeat = isrepeat ? false : true;
}

repeatButton.addEventListener("click", toggleRepeat);

/**
 *  VOLUME
 *
 * ADJUST THE VOLUME OF THE MUSIC
 *
 */
const volumerangeinput = document.querySelector("[data-volume]");
const volumeicons = document.querySelectorAll("[data-volume-button]");
console.log(volumeicons[0]);

function adjustvolume(e) {
  audio.volume = e.target.value;
  if (audio.volume !== 0) {
    volumeicons[1].classList.add("hidden");
    volumeicons[0].classList.remove("hidden");
    console.log("muted");
  } else {
    volumeicons[0].classList.add("hidden");
    volumeicons[1].classList.remove("hidden");
  }

  console.log(e.target.value);
}

volumerangeinput.addEventListener("input", adjustvolume);
addEvent(volumeicons, "click", () => {
  volumerangeinput.classList.toggle("hide-volume");
});
