// -----------------------------------
// MOTIVATION (unchanged)
// -----------------------------------
function showMotivation() {
  const quotes = [
    "Keep pushing! Success is closer than you think.",
    "Believe in yourself and all that you are!",
    "You’re capable of amazing things!",
    "Don’t stop until you’re proud."
  ];
  alert(quotes[Math.floor(Math.random() * quotes.length)]);
}

// -----------------------------------
// ADD NOTICE (unchanged)
// -----------------------------------
function addNotice() {
  const input = document.getElementById("newNotice");
  const noticeList = document.getElementById("noticeList");

  const text = input.value.trim();
  if (text === "") {
    alert("Please type something before adding!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = text;
  noticeList.appendChild(li);

  input.value = "";  
  alert("✅ Notice added successfully!");
}

// -----------------------------------
// BACKEND SETTINGS
// -----------------------------------
const BASE = "http://localhost:5000/api"; 
const STUDENT_EMAIL = "aman@example.com";  // replace if different

// Get student ID from backend using email
async function getStudentId() {
  try {
    const r = await fetch(`${BASE}/students/email/${STUDENT_EMAIL}`);
    const data = await r.json();
    return data._id;
  } catch (err) {
    console.error("Could not fetch student ID", err);
    return null;
  }
}

// -----------------------------------
// REAL ATTENDANCE FROM BACKEND
// -----------------------------------
async function calculateAttendance() {
  const studentId = await getStudentId();
  if (!studentId) return;

  // Fetch last 30 days attendance
  const r = await fetch(`${BASE}/attendance/heatmap/${studentId}?days=30`);
  const arr = await r.json();

  const total = arr.length;
  const present = arr.filter(x => x.status === "present").length;
  const absent = total - present;
  const percent = total ? ((present / total) * 100).toFixed(1) : "0.0";

  // Update HTML
  if (document.getElementById("totalDays")) {
    document.getElementById("totalDays").textContent = total;
  }
  if (document.getElementById("presentDays")) {
    document.getElementById("presentDays").textContent = present;
  }
  if (document.getElementById("absentDays")) {
    document.getElementById("absentDays").textContent = absent;
  }
  if (document.getElementById("percent")) {
    document.getElementById("percent").textContent = percent + "%";
  }
}

// Call function on page load
calculateAttendance();
