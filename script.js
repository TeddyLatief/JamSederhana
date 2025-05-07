function updateClock() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  const hourDeg = ((hour % 12) + minute / 60) * 30;
  const minuteDeg = (minute + second / 60) * 6;
  const secondDeg = second * 6;

  document.getElementById("hour").style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
  document.getElementById("minute").style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  document.getElementById("second").style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;

  document.getElementById("digitalTime").textContent = now.toLocaleTimeString("id-ID");
}
setInterval(updateClock, 1000);
updateClock();

function showJam() {
  document.getElementById("analog").classList.remove("hidden");
  document.getElementById("digital").classList.add("hidden");
  document.getElementById("calendar").classList.add("hidden");
  document.getElementById("timer").classList.add("hidden");
  document.getElementById("switchButtons").classList.remove("hidden");
}

function showTimer() {
  document.getElementById("analog").classList.add("hidden");
  document.getElementById("digital").classList.add("hidden");
  document.getElementById("calendar").classList.add("hidden");
  document.getElementById("timer").classList.remove("hidden");
  document.getElementById("switchButtons").classList.add("hidden");
}

function showCalendar() {
  document.getElementById("analog").classList.add("hidden");
  document.getElementById("digital").classList.add("hidden");
  document.getElementById("calendar").classList.remove("hidden");
  document.getElementById("timer").classList.add("hidden");
  document.getElementById("switchButtons").classList.add("hidden");
}

function showAnalog() {
  document.getElementById("analog").classList.remove("hidden");
  document.getElementById("digital").classList.add("hidden");
}

function showDigital() {
  document.getElementById("analog").classList.add("hidden");
  document.getElementById("digital").classList.remove("hidden");
}

// Kalender
function generateCalendar(month, year) {
  const calendarContainer = document.getElementById("calendarContainer");
  calendarContainer.innerHTML = "";

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const table = document.createElement("table");
  table.classList.add("calendar-table");

  const thead = table.createTHead();
  const headRow = thead.insertRow();
  for (let d of days) {
    const th = document.createElement("th");
    th.textContent = d;
    headRow.appendChild(th);
  }

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const tbody = table.createTBody();
  let row = tbody.insertRow();
  let cellIndex = 0;

  for (let i = 0; i < firstDay; i++) {
    row.insertCell();
    cellIndex++;
  }

  for (let date = 1; date <= totalDays; date++) {
    if (cellIndex === 7) {
      row = tbody.insertRow();
      cellIndex = 0;
    }
    const cell = row.insertCell();
    cell.textContent = date;
    cell.className = "calendar-cell";
    if (date === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
      cell.classList.add("today");
    }
    cellIndex++;
  }

  calendarContainer.appendChild(table);
}
generateCalendar(new Date().getMonth(), new Date().getFullYear());

// ==== TIMER ====

let timerInterval = null;
let remainingSeconds = 0;
let isPaused = false;

// Mulai timer
function startTimer() {
  // Ambil input waktu jika timer baru atau setelah reset
  if (!isPaused) {
    const minutes = parseInt(document.getElementById("minuteInput").value) || 0;
    const seconds = parseInt(document.getElementById("secondInput").value) || 0;
    remainingSeconds = minutes * 60 + seconds;
  }

  // Jangan mulai jika waktu kosong
  if (remainingSeconds <= 0) return;

  isPaused = false;
  updateTimerDisplay();

  // Jalankan interval tiap detik
  timerInterval = setInterval(() => {
    if (!isPaused) {
      remainingSeconds--;
      updateTimerDisplay();

      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        alert("⏰ Waktu habis!");
      }
    }
  }, 1000);
}

// Jeda sementara timer
function pauseTimer() {
  isPaused = true;
  clearInterval(timerInterval);
}

// Reset timer ke awal
function resetTimer() {
  clearInterval(timerInterval);
  isPaused = false;
  remainingSeconds = 0;
  updateTimerDisplay();

  // Kosongkan input
  document.getElementById("minuteInput").value = "";
  document.getElementById("secondInput").value = "";
}

// Tampilkan waktu dalam format MM:SS
function updateTimerDisplay() {
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");
  document.getElementById("timerDisplay").textContent = `${minutes}:${seconds}`;
}
