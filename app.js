const musics = [
  {
    id: 1,
    img: 'Images/nakoni-bavar.jpg',
    music: 'Musics/07 ZedBazi - Nakoni Bavar Featuring Behzad Leito .mp3',
    name: 'nakoni bavar',
    artist: 'zedbazi'
  },
  {
    id: 2,
    img: 'Images/kerm.jpg',
    music: 'Musics/04. Kerm.mp3',
    name: 'kerm',
    artist: 'shayea'
  },
  {
    id: 3,
    img: 'Images/leaving-heaven.jpg',
    music: 'Musics/09 Leaving Heaven.mp3',
    name: 'leaving heaven',
    artist: 'eminem'
  },
  {
    id: 4,
    img: 'Images/emrooz-na.jpg',
    music: 'Musics/11 Emrooz Na (Ft Kiarash).mp3',
    name: 'Emrooz Na',
    artist: 'hidden ft wilson'
  },
  {
    id: 5,
    img: 'Images/dari-be-chi-fek-mikoni.jpg',
    music:
      'Musics/Amir Tataloo - Shomare 7 - 05 - To Dari Be Chi Fekr Mikoni.mp3',
    name: 'Be Chi Fekr Mikoni',
    artist: 'amir tataloo'
  },
  {
    id: 6,
    img: 'Images/tamum-shude.jpg',
    music: 'Musics/Reza Pishro - Tamum Shode (Ft. Kamyar).mp3',
    name: 'Tamum Shode',
    artist: 'reza pishro'
  },
  {
    id: 7,
    img: 'Images/woah.jpg',
    music: 'Musics/Woah.mp3',
    name: 'Woah',
    artist: 'cathcy beats'
  }
]

// Make Selectords
const $selector = name => document.querySelector(name)
const $selectorAll = names => document.querySelectorAll(names)

const musicBox = $selector('.music-box')
const musicImg = $selector('.cover-img')
const musicName = $selector('.music-name')
const musicArtist = $selector('.music-artist')

// play and pause
const playBtn = $selector('.play-pause')
playBtn.addEventListener('click', e => {
  if (!e.currentTarget.classList.contains('active')) {
    e.currentTarget.classList.add('active')
    musicImg.classList.add('cover-rotate')
    musicBox.play()
  } else {
    e.currentTarget.classList.remove('active')
    musicImg.classList.remove('cover-rotate')
    musicBox.pause()
  }
})

const backwardBtn = $selector('.backward')
const forwardBtn = $selector('.forward')
let counter = 0
//forward and backward function
const forwardMusic = () => {
  counter++
  if (counter > musics.length - 1) {
    counter = 0
  }

  changeMusic()
}

forwardBtn.addEventListener('click', forwardMusic)

const backwardMusic = () => {
  counter--
  if (counter < 0) {
    counter = musics.length - 1
  }

  changeMusic()
}

backwardBtn.addEventListener('click', backwardMusic)

const changeMusic = () => {
  musicBox.setAttribute('src', `${musics[counter].music}`)
  musicImg.setAttribute('src', `${musics[counter].img}`)
  musicName.innerText = `${musics[counter].name}`
  musicArtist.innerText = `${musics[counter].artist}`
  musicBox.play()
  playBtn.classList.add('active')
  musicImg.classList.add('cover-rotate')
}

//set progres bar and time
const progressBar = $selector('.progress')
const currentTimeSpan = $selector('.current-time')
const wholeTimeSpan = $selector('.whole-time')

musicBox.addEventListener('timeupdate', e => {
  const duration = e.target.duration
  const currentTime = e.target.currentTime
  const progresFill = (currentTime / duration) * 100
  progressBar.style.width = `${progresFill}%`
  //display whole music time
  let wholeMin = Math.trunc(duration / 60)
  let wholeMinSecounds = Math.trunc(duration % 60)

  wholeMin = wholeMin < 10 ? '0' + wholeMin : wholeMin
  wholeMinSecounds =
    wholeMinSecounds < 10 ? '0' + wholeMinSecounds : wholeMinSecounds
  wholeTimeSpan.innerText = `${wholeMin} : ${wholeMinSecounds}`

  //display current time
  let currentMin = Math.trunc(currentTime / 60)
  currentMin = currentMin < 10 ? '0' + currentMin : currentMin
  let currentSeconds = Math.trunc(currentTime % 60)
  currentSeconds = currentSeconds < 10 ? '0' + currentSeconds : currentSeconds

  currentTimeSpan.innerText = `${currentMin} : ${currentSeconds}`

  //when song end
  if (currentTimeSpan.innerText == wholeTimeSpan.innerText) {
    forwardMusic()
  }
})

//manual progrss bar
const progressBarContainer = $selector('.progress-bar')

progressBarContainer.addEventListener('click', e => {
  const clickX = e.offsetX
  const width = e.target.clientWidth
  const wholeMusicTime = musicBox.duration
  musicBox.currentTime = (clickX / width) * wholeMusicTime
})
