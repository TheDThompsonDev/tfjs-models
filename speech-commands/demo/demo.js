(async () => {

  const recognizer = speechCommands.create('BROWSER_FFT');
  await recognizer.ensureModelLoaded();

  // See the array of words that the recognizer is trained to recognize.
  const words = recognizer.wordLabels();
  console.log(words);

  const listenButton = document.getElementById('listen')

  listenButton.addEventListener('click', (e) => {
    console.log('listening', e);

    if(!listenButton.classList.contains('active')) {
      listenButton.innerText = 'Stop Listening'

    recognizer.listen(result => {

      // - result.scores contains the probability scores that correspond to
      //   recognizer.wordLabels().
      // - result.spectrogram contains the spectrogram of the recognized word.
      const highestScore = [...result.scores].sort((a, b) => b - a)[0];
      const index = result.scores.indexOf(highestScore);
      const errorThreshold = 0.1;

      if (highestScore + errorThreshold >= 1.0) {
        // console.log(highestScore, index);
        const commandWord = words[index];
        console.log(commandWord);

        if (commandWord === 'down') {
          window.scrollTo({
            top: window.innerHeight + window.scrollY,
            behavior: 'smooth'
          });
        } else if (commandWord === 'up') {
          window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth'
          });
        }
      } else {
        console.log('nonsense word detected');
      }
    }, {
      includeSpectrogram: true,
      probabilityThreshold: 0.75
    });

  } else {
    listenButton.innerText = 'Start Listening'
    recognizer.stopListening();
  }
  listenButton.classList.toggle('active')

    // Stop the recognition in 10 seconds.
    // setTimeout(() => {
    //   // listeningEl.classList.toggle('active');
    //   recognizer.stopListening()
    // }, 20000);
  });

  document.addEventListener("keydown", (event) => {
    // Check if the pressed key is the space bar
    if (event.keyCode === 32) {
      // Check if Cmd + Shift (or Ctrl + Shift) is pressed
      if ((event.metaKey && event.shiftKey) || (event.ctrlKey && event.shiftKey)) {
        // Trigger the action
        console.log("event listener triggered")
      }
    }
  });
})();
