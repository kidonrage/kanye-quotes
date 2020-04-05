import './styles/main.css';
import themes from './themes';

let previousImageIdx = 0;

const getRandomTheme = () => themes[Math.floor(Math.random() * themes.length)]

function getRandomImageUrl() {
  const lastImageIndex = 24;
  
  let imageIndex = 0;

  do {
    imageIndex = randomIntFromInterval(0, lastImageIndex);
  } while (imageIndex === previousImageIdx);

  previousImageIdx = imageIndex;

  return `images/${imageIndex}.jpg`;
}

function updateQuote(quoteText) {
  const $background = document.body;
  const $quoteContainer = document.getElementById('quote-container');
  const $quote = document.getElementById('quote');

  const theme = getRandomTheme();
  const imageUrl = getRandomImageUrl();

  return new Promise((resolve, reject) => {
    loadImage(imageUrl)
      .then(() => {
        const BGImage = `${theme.overlay}, url(${imageUrl})`
        $background.style.backgroundImage = BGImage;
      
        $quoteContainer.removeAttribute('style');
        Object.keys(theme.textStyles).forEach(key => {
          $quoteContainer.style[key] = theme.textStyles[key]
        })
        
        $quote.innerText = quoteText;

        resolve();
      })
  })
}

function loadImage(url, callback) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = resolve;
  })
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getQuote() {
  return fetch('https://api.kanye.rest')
          .then(response => response.json())
          .then(response => response.quote)
}

document.addEventListener('click', handleClick)

function handleClick(event) {
  const dataBtn = event.target.dataset.btn;
  if (dataBtn) {
    if (dataBtn === 'load') {
      refresh();
    }
  }
}

const getLoader = () => {
  const ANIMATION_DURATION = 1000;
  const $loader = document.getElementById('loading');
  $loader.style.animationDuration = `${ANIMATION_DURATION / 1000}s`;

  return {
    close() {
      $loader.classList.add('hiding');
      setTimeout(() => {
        $loader.classList.add('hidden');
        $loader.classList.remove('hiding');
      }, ANIMATION_DURATION);
    },
    open() {
      $loader.classList.add('opening');
      $loader.classList.remove('hidden')
      return new Promise((resolve, reject) => setTimeout(() => {
        $loader.classList.remove('opening')
        resolve();
      }, ANIMATION_DURATION));
    }
  }
}

function refresh() {
  const loader = getLoader();
  
  loader.open()
    .then(getQuote)
    .then(updateQuote)
    .then(loader.close);
}

refresh();