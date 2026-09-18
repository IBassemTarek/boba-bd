export function createBirthdayPlayer(onEnded) {
  const audio = new Audio('/audio/egyptian-birthday-song.mp3')
  audio.preload = 'metadata'
  audio.volume = 0.65
  audio.addEventListener('ended', onEnded)

  const stop = () => {
    audio.pause()
  }

  const play = async () => {
    if (audio.ended) audio.currentTime = 0
    await audio.play()
  }

  const destroy = () => {
    stop()
    audio.removeEventListener('ended', onEnded)
    audio.src = ''
  }

  return { play, stop, destroy }
}
