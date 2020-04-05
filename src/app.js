import './styles.css';
let previousImageIdx = 0;

const getRandomTheme = (overlayOpacity = 0.6) => {
  const themes = [
    {
      // KSG
      overlay: `radial-gradient(circle, rgba(204,71,122,${overlayOpacity}) 0%, rgba(227,187,59,${overlayOpacity}) 60%, rgba(106,164,162,${overlayOpacity}) 100%)`, 
      textStyles: {
        fontFamily: 'KSG'
      }
    },
    {
      // TLOP
      overlay: 'radial-gradient(circle, rgba(227,217,188,0.7) 0%, rgba(246,210,147,0.7) 35%, rgba(252,135,72,0.7) 65%, rgba(161,97,66,0.7) 90%, rgba(75,37,34,1) 100%)',
      textStyles: {
        lineHeight: 1.3,
        fontSize: '102px',
        color: '#000',
        fontFamily: 'TLOP',
        textAlign: 'center'
      }
    },
    {
      // YEEZUS
      overlay: `radial-gradient(circle, rgba(255,0,0,${overlayOpacity}) 0%, rgba(213,219,223,${overlayOpacity}) 46%, rgba(115,188,198,${overlayOpacity}) 77%, rgba(0,209,186,${overlayOpacity}) 100%)`, 
      textStyles: {
        fontFamily: 'YEEZUS',
        fontSize: '120px',
        lineHeight: 1.5
      }
    },
    {
      // 808
      overlay: `linear-gradient(90deg, rgba(255,255,255,${overlayOpacity}) 20%, rgba(211,140,124,${overlayOpacity}) 20%, rgba(211,140,124,${overlayOpacity}) 40%, rgba(201,221,221,${overlayOpacity}) 40%, rgba(201,221,221,${overlayOpacity}) 60%, rgba(255,184,175,${overlayOpacity}) 60%, rgba(255,184,175,${overlayOpacity}) 80%, rgba(245,0,0,${overlayOpacity}) 80%, rgba(245,0,0,${overlayOpacity}) 100%)`, 
      textStyles: {
        fontFamily: '808'
      }
    },
    {
      // JIK
      overlay: `radial-gradient(circle, rgba(38,0,212,${overlayOpacity}) 0%, rgba(36,0,193,${overlayOpacity}) 11%, rgba(33,0,184,${overlayOpacity}) 100%)`, 
      textStyles: {
        fontFamily: 'JIK',
        color: 'rgb(255,239,0)'
      }
    },
  ]

  return themes[0]
  return themes[Math.floor(Math.random() * themes.length)]
} 


function getRandomImageUrl() {
  const lastImageIndex = 24;
  
  let imageIndex = 0;

  do {
    imageIndex = randomIntFromInterval(0, lastImageIndex);
  } while (imageIndex === previousImageIdx);

  previousImageIdx = imageIndex;

  return `images/${imageIndex}.jpg`;
}

function changeImage() {
  const $background = document.body;
  const $quote = document.getElementById('quote');

  const theme = getRandomTheme();
  const imageUrl = getRandomImageUrl();

  const BGImage = `${theme.overlay}, url(${imageUrl})`
  $background.style.backgroundImage = BGImage;

  $quote.removeAttribute('style');
  Object.keys(theme.textStyles).forEach(key => {
    $quote.style[key] = theme.textStyles[key]
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

function renderQuote(quoteText) {
  const $quote = document.getElementById('quote');
  $quote.innerText = quoteText;
}

document.addEventListener('click', refresh)

function refresh() {
  getQuote()
    .then((quote) => {
      renderQuote(quote);
      changeImage();
    })
}

refresh();