// ============================================
// INITIALIZE DATA
// ============================================

function initializeData() {
  if (!localStorage.getItem("users")) {
    const defaultUsers = [
      { name: "Admin User", email: "admin@test.com", password: "admin123", role: "admin" },
      { name: "Student User", email: "student@test.com", password: "student123", role: "student" },
    ]
    localStorage.setItem("users", JSON.stringify(defaultUsers))
  }
  if (!localStorage.getItem("students")) {
    localStorage.setItem("students", JSON.stringify([]))
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function showError(elementId, message) {
  const element = document.getElementById(elementId)
  if (element) {
    element.textContent = message
    element.style.display = "block"
  }
}

function clearError(elementId) {
  const element = document.getElementById(elementId)
  if (element) {
    element.textContent = ""
    element.style.display = "none"
  }
}

function showSuccess(message) {
  const alertDiv = document.createElement("div")
  alertDiv.style.cssText = `
    position: fixed; top: 20px; right: 20px; 
    background-color: #00d084; color: white; 
    padding: 15px 20px; border-radius: 8px; z-index: 2000;
  `
  alertDiv.textContent = message
  document.body.appendChild(alertDiv)
  setTimeout(() => alertDiv.remove(), 3000)
}

function checkAuth() {
  const currentUser = sessionStorage.getItem("currentUser")
  if (!currentUser) {
    showPage("loginPage")
    return null
  }
  return JSON.parse(currentUser)
}

function calculateTotal(e, m, s, h, g) {
  return Number.parseInt(e) + Number.parseInt(m) + Number.parseInt(s) + Number.parseInt(h) + Number.parseInt(g)
}

function calculateGrade(total) {
  const percentage = (total / 500) * 100
  if (percentage >= 90) return "A+"
  if (percentage >= 80) return "A"
  if (percentage >= 70) return "B+"
  if (percentage >= 60) return "B"
  if (percentage >= 50) return "C"
  return "F"
}

// ============================================
// PAGE & TAB NAVIGATION
// ============================================

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"))
  const page = document.getElementById(pageId)
  if (page) page.classList.add("active")
}

function switchTab(tabName) {
  const tabs = document.querySelectorAll(".tab-content")
  tabs.forEach((tab) => tab.classList.remove("active"))

  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => link.classList.remove("active"))

  const selectedTab = document.getElementById(tabName)
  if (selectedTab) selectedTab.classList.add("active")

  event.target.classList.add("active")

  if (tabName === "view-students") loadStudents()
  if (tabName === "results") loadStudentResults()
}

function logout() {
  sessionStorage.removeItem("currentUser")
  showPage("loginPage")
  document.getElementById("loginForm").reset()
}

// ============================================
// AUTHENTICATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initializeData()

  // Login Form
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("loginEmail").value
      const password = document.getElementById("loginPassword").value
      const role = document.getElementById("loginRole").value

      if (!email || !password || !role) {
        showError("loginError", "All fields required")
        return
      }

      if (!isValidEmail(email)) {
        showError("loginError", "Invalid email format")
        return
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((u) => u.email === email && u.password === password && u.role === role)

      if (user) {
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({
            email: user.email,
            role: user.role,
            name: user.name,
          }),
        )

        clearError("loginError")
        if (user.role === "admin") {
          showPage("adminPage")
          setTimeout(() => updateDashboardStats(), 100)
        } else {
          showPage("studentPage")
          document.getElementById("studentNameDisplay").textContent = user.name
          document.getElementById("profileEmail").value = user.email
          document.getElementById("profileName").value = user.name
          loadProfileData()
          setTimeout(() => loadStudentResults(), 100)
        }
      } else {
        showError("loginError", "Invalid credentials")
      }
    })
  }

  // Register Form
  const registerForm = document.getElementById("registerForm")
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const name = document.getElementById("regName").value.trim()
      const email = document.getElementById("regEmail").value.trim()
      const password = document.getElementById("regPassword").value
      const confirmPassword = document.getElementById("regConfirmPassword").value
      const role = document.getElementById("regRole").value

      clearError("registerError")

      if (!name) {
        showError("registerError", "Name required")
        return
      }
      if (!isValidEmail(email)) {
        showError("registerError", "Invalid email")
        return
      }
      if (password.length < 6) {
        showError("registerError", "Password min 6 characters")
        return
      }
      if (password !== confirmPassword) {
        showError("registerError", "Passwords do not match")
        return
      }
      if (!role) {
        showError("registerError", "Select a role")
        return
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]")
      if (users.some((u) => u.email === email)) {
        showError("registerError", "Email already registered")
        return
      }

      users.push({ name, email, password, role })
      localStorage.setItem("users", JSON.stringify(users))
      showSuccess("Account created! Redirecting...")
      setTimeout(() => {
        showPage("loginPage")
        registerForm.reset()
      }, 1500)
    })
  }

  // Add Student Form
  const addStudentForm = document.getElementById("addStudentForm")
  if (addStudentForm) {
    addStudentForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const name = document.getElementById("studentName").value.trim()
      const rollNumber = document.getElementById("rollNumber").value.trim()
      const className = document.getElementById("className").value.trim()
      const email = document.getElementById("studentEmail").value.trim()
      const english = Number.parseInt(document.getElementById("englishMarks").value)
      const math = Number.parseInt(document.getElementById("mathMarks").value)
      const science = Number.parseInt(document.getElementById("scienceMarks").value)
      const history = Number.parseInt(document.getElementById("historyMarks").value)
      const geography = Number.parseInt(document.getElementById("geographyMarks").value)

      clearError("addStudentError")

      if (!name || !rollNumber || !className || !email) {
        showError("addStudentError", "All fields required")
        return
      }

      const students = JSON.parse(localStorage.getItem("students") || "[]")
      if (students.some((s) => s.rollNumber === rollNumber)) {
        showError("addStudentError", "Roll number already exists")
        return
      }

      const total = calculateTotal(english, math, science, history, geography)
      const grade = calculateGrade(total)

      students.push({
        rollNumber,
        name,
        class: className,
        email,
        english,
        math,
        science,
        history,
        geography,
        total,
        grade,
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem("students", JSON.stringify(students))
      addStudentForm.reset()
      showSuccess("Student added successfully!")
      loadStudents()
      updateDashboardStats()
    })
  }

  // Edit Form
  const editForm = document.getElementById("editForm")
  if (editForm) {
    editForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const students = JSON.parse(localStorage.getItem("students") || "[]")
      const student = students.find((s) => s.rollNumber === window.currentEditRoll)

      if (student) {
        student.name = document.getElementById("editStudentName").value
        student.class = document.getElementById("editClassName").value
        student.english = Number.parseInt(document.getElementById("editEnglishMarks").value)
        student.math = Number.parseInt(document.getElementById("editMathMarks").value)
        student.science = Number.parseInt(document.getElementById("editScienceMarks").value)
        student.history = Number.parseInt(document.getElementById("editHistoryMarks").value)
        student.geography = Number.parseInt(document.getElementById("editGeographyMarks").value)
        student.total = calculateTotal(
          student.english,
          student.math,
          student.science,
          student.history,
          student.geography,
        )
        student.grade = calculateGrade(student.total)

        localStorage.setItem("students", JSON.stringify(students))
        closeEditModal()
        showSuccess("Student updated!")
        loadStudents()
        updateDashboardStats()
      }
    })
  }

  // Profile Form
  const profileForm = document.getElementById("profileForm")
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
      const phone = document.getElementById("profilePhone").value
      const address = document.getElementById("profileAddress").value

      const profiles = JSON.parse(localStorage.getItem("studentProfiles") || "{}")
      profiles[currentUser.email] = {
        name: document.getElementById("profileName").value,
        phone,
        address,
        updatedAt: new Date().toISOString(),
      }
      localStorage.setItem("studentProfiles", JSON.stringify(profiles))
      showSuccess("Profile updated!")
    })
  }

  // Search & Sort
  const searchInput = document.getElementById("searchInput")
  const sortBy = document.getElementById("sortBy")
  if (searchInput) searchInput.addEventListener("input", loadStudents)
  if (sortBy) sortBy.addEventListener("change", loadStudents)
})

// ============================================
// ADMIN FUNCTIONS
// ============================================

let currentEditRoll = null

function loadStudents() {
  const students = JSON.parse(localStorage.getItem("students") || "[]")
  const searchTerm = (document.getElementById("searchInput")?.value || "").toLowerCase()
  const sortOption = document.getElementById("sortBy")?.value || ""

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(searchTerm) || s.rollNumber.toLowerCase().includes(searchTerm),
  )

  if (sortOption === "name") filtered.sort((a, b) => a.name.localeCompare(b.name))
  else if (sortOption === "total-desc") filtered.sort((a, b) => b.total - a.total)
  else if (sortOption === "total-asc") filtered.sort((a, b) => a.total - b.total)

  const tbody = document.getElementById("studentsList")
  if (!tbody) return

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="11">No students found</td></tr>'
    return
  }

  tbody.innerHTML = filtered
    .map(
      (s) => `
    <tr>
      <td>${s.rollNumber}</td>
      <td>${s.name}</td>
      <td>${s.class}</td>
      <td>${s.english}</td>
      <td>${s.math}</td>
      <td>${s.science}</td>
      <td>${s.history}</td>
      <td>${s.geography}</td>
      <td><strong>${s.total}</strong></td>
      <td><span style="color: var(--accent-color); font-weight: 600;">${s.grade}</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-primary btn-sm" onclick="openEditModal('${s.rollNumber}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteStudent('${s.rollNumber}')">Delete</button>
        </div>
      </td>
    </tr>
  `,
    )
    .join("")
}

function deleteStudent(rollNumber) {
  if (!confirm("Delete this student?")) return
  const students = JSON.parse(localStorage.getItem("students") || "[]")
  const updated = students.filter((s) => s.rollNumber !== rollNumber)
  localStorage.setItem("students", JSON.stringify(updated))
  showSuccess("Student deleted!")
  loadStudents()
  updateDashboardStats()
}

function openEditModal(rollNumber) {
  const students = JSON.parse(localStorage.getItem("students") || "[]")
  const student = students.find((s) => s.rollNumber === rollNumber)

  if (!student) return

  currentEditRoll = rollNumber
  document.getElementById("editStudentName").value = student.name
  document.getElementById("editClassName").value = student.class
  document.getElementById("editEnglishMarks").value = student.english
  document.getElementById("editMathMarks").value = student.math
  document.getElementById("editScienceMarks").value = student.science
  document.getElementById("editHistoryMarks").value = student.history
  document.getElementById("editGeographyMarks").value = student.geography

  document.getElementById("editModal").classList.add("active")
}

function closeEditModal() {
  document.getElementById("editModal").classList.remove("active")
  currentEditRoll = null
}

function updateDashboardStats() {
  const students = JSON.parse(localStorage.getItem("students") || "[]")

  if (students.length === 0) {
    document.getElementById("totalStudents").textContent = "0"
    document.getElementById("averageGrade").textContent = "-"
    document.getElementById("highestScore").textContent = "-"
    return
  }

  document.getElementById("totalStudents").textContent = students.length
  const avgMarks = (students.reduce((sum, s) => sum + s.total, 0) / students.length).toFixed(1)
  document.getElementById("averageGrade").textContent = calculateGrade(avgMarks)
  const highest = Math.max(...students.map((s) => s.total))
  document.getElementById("highestScore").textContent = highest
}

// ============================================
// STUDENT FUNCTIONS
// ============================================

function loadStudentResults() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
  const students = JSON.parse(localStorage.getItem("students") || "[]")
  const student = students.find((s) => s.email === currentUser.email)

  const noResults = document.getElementById("noResults")
  const resultsContent = document.getElementById("resultsContent")

  if (!student) {
    if (noResults) noResults.style.display = "block"
    if (resultsContent) resultsContent.style.display = "none"
    return
  }

  if (noResults) noResults.style.display = "none"
  if (resultsContent) resultsContent.style.display = "block"

  document.getElementById("resultName").textContent = student.name
  document.getElementById("resultRoll").textContent = student.rollNumber
  document.getElementById("resultClass").textContent = student.class
  document.getElementById("markEnglish").textContent = student.english
  document.getElementById("markMath").textContent = student.math
  document.getElementById("markScience").textContent = student.science
  document.getElementById("markHistory").textContent = student.history
  document.getElementById("markGeography").textContent = student.geography
  document.getElementById("resultTotal").textContent = student.total
  document.getElementById("resultAverage").textContent = (student.total / 5).toFixed(1)
  document.getElementById("resultGrade").textContent = student.grade
}

function loadProfileData() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
  const profiles = JSON.parse(localStorage.getItem("studentProfiles") || "{}")
  const profile = profiles[currentUser.email] || {}
  document.getElementById("profilePhone").value = profile.phone || ""
  document.getElementById("profileAddress").value = profile.address || ""
}

function downloadResult() {
  const name = document.getElementById("resultName").textContent
  const roll = document.getElementById("resultRoll").textContent
  const className = document.getElementById("resultClass").textContent
  const marks = {
    English: document.getElementById("markEnglish").textContent,
    Math: document.getElementById("markMath").textContent,
    Science: document.getElementById("markScience").textContent,
    History: document.getElementById("markHistory").textContent,
    Geography: document.getElementById("markGeography").textContent,
  }
  const total = document.getElementById("resultTotal").textContent
  const grade = document.getElementById("resultGrade").textContent

  const content = `STUDENT RESULT SHEET\n${"=".repeat(40)}\nName: ${name}\nRoll: ${roll}\nClass: ${className}\nDate: ${new Date().toLocaleDateString()}\n\nMARKS\n${"=".repeat(40)}\nEnglish: ${marks.English}\nMath: ${marks.Math}\nScience: ${marks.Science}\nHistory: ${marks.History}\nGeography: ${marks.Geography}\n\n${"=".repeat(40)}\nTotal: ${total}/500\nGrade: ${grade}\n${"=".repeat(40)}`

  const element = document.createElement("a")
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
  element.setAttribute("download", `Result_${roll}.txt`)
  element.style.display = "none"
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
  showSuccess("Result downloaded!")
}

document.addEventListener("click", (e) => {
  const modal = document.getElementById("editModal")
  if (modal && e.target === modal) closeEditModal()
})
