export const getLoadingView = () => {
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