import './styles.css';

console.log("Kanye west app works");

const $background = document.getElementById('background-overlay');
$background.style.backgroundImage = ''

const lastImageIndex = 24;

const imageIndex = randomIntFromInterval(0, lastImageIndex);
const BGImageUrl = `url(images/${imageIndex}.jpg`
$background.style.backgroundImage = BGImageUrl;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
