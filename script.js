// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Populate the voice options dropdown
function populateVoices() {
  voices = speechSynthesis.getVoices();

  voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    voicesDropdown.appendChild(option);
  });
}

// Set up voice, rate, pitch, and text settings
function setSpeechProperties() {
  const selectedVoice = voicesDropdown.value;
  msg.voice = voices.find(voice => voice.name === selectedVoice);

  msg.rate = document.querySelector('[name="rate"]').value;
  msg.pitch = document.querySelector('[name="pitch"]').value;
  msg.text = document.querySelector('[name="text"]').value;
}

// Speak the text
function speakText() {
  if (msg.text.trim() === "") {
    alert("Please enter some text to speak.");
    return;
  }
  speechSynthesis.speak(msg);
}

// Stop the speech
function stopSpeech() {
  speechSynthesis.cancel();
}

// Event listeners for controls
speakButton.addEventListener('click', () => {
  setSpeechProperties();
  speakText();
});

stopButton.addEventListener('click', stopSpeech);

// Populate voices when available
speechSynthesis.onvoiceschanged = populateVoices;
populateVoices();
