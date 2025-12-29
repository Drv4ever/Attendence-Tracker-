
  
let token = null;

// restore token from previous session
token = localStorage.getItem("token") || null;

// Safe DOM helpers
const qs = id => document.getElementById(id);
const on = (id, ev, handler) => {
  const el = qs(id);
  if (el) el.addEventListener(ev, handler);
};
// SIMULATED STUDENT LIST (in real app, fetch from backend)
const students = [
  { id: "695213ca35de7d9c499a567d", name: "Rahul" },
  { id: "695213ca35de7d9c499a567e", name: "Dhruv" }
];

// Populate student dropdown (if present)
const studentSelect = qs("studentSelect");
if (studentSelect) {
  students.forEach(s => {
    const option = document.createElement("option");
    option.value = s.id;
    option.textContent = s.name;
    studentSelect.appendChild(option);
  });
}

// Initial UI state based on token
(() => {
  const loginDiv = qs("loginDiv");
  const attendanceDiv = qs("attendanceDiv");
  if (token) {
    if (loginDiv) loginDiv.classList.add("hidden");
    if (attendanceDiv) attendanceDiv.classList.remove("hidden");
  } else {
    if (attendanceDiv) attendanceDiv.classList.add("hidden");
    if (loginDiv) loginDiv.classList.remove("hidden");
  }
})();

// ====== SIGNUP ======
on("signupBtn", "click", async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("emailSignup").value;
  const password = document.getElementById("passwordSignup").value;
  const role = document.getElementById("role").value;

  const res = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role })
  });

  const data = await res.json();
  alert(JSON.stringify(data));
  if (data.success) {
    document.getElementById("signupDiv").classList.add("hidden");
    document.getElementById("loginDiv").classList.remove("hidden");
  }
});

// ====== LOGIN ======
on("loginBtn", "click", async () => {
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    localStorage.setItem("token", token);
    alert("Login successful!");
    document.getElementById("loginDiv").classList.add("hidden");
    document.getElementById("attendanceDiv").classList.remove("hidden");
  } else {
    alert("Login failed! Check email/password.");
  }
});

// ====== LOGOUT ======
on("logoutBtn", "click", () => {
  token = null;
  localStorage.removeItem("token");
  const attendanceDiv = qs("attendanceDiv");
  const loginDiv = qs("loginDiv");
  if (attendanceDiv) attendanceDiv.classList.add("hidden");
  if (loginDiv) loginDiv.classList.remove("hidden");
});

// ====== MARK ATTENDANCE ======
on("markBtn", "click", async () => {
  if (!studentSelect) {
    alert("Student selector not available");
    return;
  }
  const studentId = studentSelect.value;
  const classIdEl = qs("classId");
  const statusEl = qs("status");
  const classId = classIdEl ? classIdEl.value : null;
  const status = statusEl ? statusEl.value : null;

  if (!studentId || !classId) {
    alert("Please select student and class ID");
    return;
  }

  const res = await fetch("http://localhost:3000/attendance/mark", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ studentId, classId, date: new Date(), status })
  });

  const data = await res.json();
  alert(JSON.stringify(data));
});

// ====== VIEW ATTENDANCE ======
on("viewBtn", "click", async () => {
  const viewClassEl = qs("viewClassId");
  const classId = viewClassEl ? viewClassEl.value : null;

  if (!classId) {
    alert("Please enter Class ID");
    return;
  }

  const res = await fetch(`http://localhost:3000/attendance/class/${classId}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  const data = await res.json();
  const attendanceList = qs("attendanceList");
  if (attendanceList) attendanceList.textContent = JSON.stringify(data, null, 2);
});
