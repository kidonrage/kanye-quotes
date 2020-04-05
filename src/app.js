import './styles/main.css';
import themes from './themes';
import { getLoadingView } from './loadingView';
import { randomIntFromInterval } from './utils';

let previousImageIdx = 0;

const getRandomTheme = () => themes[randomIntFromInterval(0, themes.length - 1)]

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
      .then(() => loadFont(theme.textStyles.fontFamily))
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

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = resolve;
  })
}

function loadFont(family) {
  return new Promise((resolve, reject) => {
    document.fonts.load(`1em ${family}`)
      .then(resolve)
      .catch(console.error)
      .finally(resolve)
  }) 
}


function getQuote() {
  return fetch('https://api.kanye.rest')
          .then(response => response.json())
          .then(response => response.quote)
}

function refresh() {
  const loadingView = getLoadingView();
  
  loadingView.open()
    .then(getQuote)
    .then(updateQuote)
    .then(loadingView.close);
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

refresh();