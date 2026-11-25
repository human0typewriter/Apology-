
const audio = document.getElementById("voice");

const playButton = document.getElementById("play");
const seek = document.getElementById("seek");

const currentTime = document.getElementById("current");
const duration = document.getElementById("duration");
const message = document.getElementById("message");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);

  return `${minutes}:${String(remaining).padStart(2, "0")}`;
}

// Play and pause
playButton.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      message.textContent = "Take your time.";
    } catch (error) {
      message.textContent = "Your recording isn't ready yet.";
    }
  } else {
    audio.pause();
  }
});

// Update button appearance
audio.addEventListener("play", () => {
  playButton.textContent = "Ⅱ";
});

audio.addEventListener("pause", () => {
  playButton.textContent = "▶";
});

// Get recording duration
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

// Update progress
audio.addEventListener("timeupdate", () => {
  currentTime.textContent = formatTime(audio.currentTime);

  if (audio.duration > 0) {
    seek.value = (audio.currentTime / audio.duration) * 100;
  }
});

// Allow seeking through the recording
seek.addEventListener("input", () => {
  if (audio.duration > 0) {
    audio.currentTime = (seek.value / 100) * audio.duration;
  }
});

// When recording finishes
audio.addEventListener("ended", () => {
  playButton.textContent = "▶";
  message.textContent = "Thank you for taking a moment.";
  seek.value = 0;
});
