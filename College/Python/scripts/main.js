// Theme toggle functionality
function toggleTheme() {
  const body = document.body
  const themeIcon = document.getElementById("theme-icon")
  const themeText = document.getElementById("theme-text")

  if (body.getAttribute("data-theme") === "dark") {
    body.setAttribute("data-theme", "light")
    themeIcon.className = "fas fa-sun"
    themeText.textContent = "Dark Mode"
    localStorage.setItem("theme", "light")
  } else {
    body.setAttribute("data-theme", "dark")
    themeIcon.className = "fas fa-moon"
    themeText.textContent = "Light Mode"
    localStorage.setItem("theme", "dark")
  }
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark"
  const body = document.body
  const themeIcon = document.getElementById("theme-icon")
  const themeText = document.getElementById("theme-text")

  body.setAttribute("data-theme", savedTheme)

  if (savedTheme === "light") {
    themeIcon.className = "fas fa-sun"
    themeText.textContent = "Dark Mode"
  } else {
    themeIcon.className = "fas fa-moon"
    themeText.textContent = "Light Mode"
  }
}

// Project accordion functionality
function toggleProject(projectId) {
  const projectElement = document.getElementById(projectId)
  const header = projectElement.previousElementSibling

  if (projectElement.classList.contains("show")) {
    projectElement.classList.remove("show")
    header.classList.add("collapsed")
  } else {
    // Close all other projects
    document.querySelectorAll(".collapse.show").forEach((element) => {
      element.classList.remove("show")
      element.previousElementSibling.classList.add("collapsed")
    })

    // Open clicked project
    projectElement.classList.add("show")
    header.classList.remove("collapsed")
  }
}

// Section tab functionality
function showSection(projectId, sectionType) {
  // Hide all sections for this project
  const sections = ["oop", "dsa", "algo"]
  sections.forEach((section) => {
    const sectionElement = document.getElementById(`${projectId}-${section}`)
    if (sectionElement) {
      sectionElement.classList.add("d-none")
    }
  })

  // Remove active class from all tabs
  const projectElement = document.getElementById(projectId)
  const tabs = projectElement.querySelectorAll(".section-tab")
  tabs.forEach((tab) => tab.classList.remove("active"))

  // Show selected section
  const targetSection = document.getElementById(`${projectId}-${sectionType}`)
  if (targetSection) {
    targetSection.classList.remove("d-none")
  }

  // Add active class to clicked tab
  const clickedTab = projectElement.querySelector(`[onclick*="${sectionType}"]`)
  if (clickedTab) {
    clickedTab.classList.add("active")
  }
}

// Create stats cards
function createStatsCards(statsData) {
  const statsContainer = document.getElementById("stats-container")

  const stats = [
    { number: statsData.systems, label: "Complete Systems" },
    { number: statsData.classes, label: "OOP Classes" },
    { number: statsData.dataStructures, label: "Data Structures" },
    { number: statsData.algorithms, label: "Algorithms" },
  ]

  stats.forEach((stat) => {
    const statCard = document.createElement("div")
    statCard.className = "stat-card"
    statCard.innerHTML = `
      <div class="stat-number">${stat.number}</div>
      <div class="stat-label">${stat.label}</div>
    `
    statsContainer.appendChild(statCard)
  })
}

// Create code block
function createCodeBlock(codeData) {
  const codeBlock = document.createElement("div")
  codeBlock.className = "code-block"

  codeBlock.innerHTML = `
    <div class="code-header">${codeData.title}</div>
    <pre><code class="language-${codeData.language}">${escapeHtml(codeData.code)}</code></pre>
  `

  return codeBlock
}

// Create section content
function createSectionContent(projectId, sectionKey, sectionData) {
  const sectionDiv = document.createElement("div")
  sectionDiv.className = sectionKey === "oop" ? "section-content" : "section-content d-none"
  sectionDiv.id = `${projectId}-${sectionKey}`

  const sectionTitle = document.createElement("h4")
  sectionTitle.className = "section-title"
  sectionTitle.innerHTML = `<i class="${sectionData.icon}"></i> ${sectionData.title}`

  sectionDiv.appendChild(sectionTitle)

  // Add code blocks
  sectionData.codeBlocks.forEach((codeData) => {
    const codeBlock = createCodeBlock(codeData)
    sectionDiv.appendChild(codeBlock)
  })

  return sectionDiv
}

// Create section tabs
function createSectionTabs(projectId, sections) {
  const tabsDiv = document.createElement("div")
  tabsDiv.className = "section-tabs"

  const sectionKeys = ["oop", "dsa", "algo"]
  sectionKeys.forEach((key, index) => {
    if (sections[key]) {
      const tab = document.createElement("button")
      tab.className = index === 0 ? "section-tab active" : "section-tab"
      tab.onclick = () => showSection(projectId, key)
      tab.innerHTML = `<i class="${sections[key].icon}"></i> ${sections[key].title}`
      tabsDiv.appendChild(tab)
    }
  })

  return tabsDiv
}

// Create project card
function createProjectCard(project) {
  const projectCard = document.createElement("div")
  projectCard.className = "project-card"

  // Create header
  const header = document.createElement("div")
  header.className = project.id === "project1" ? "project-header" : "project-header collapsed"
  header.onclick = () => toggleProject(project.id)

  header.innerHTML = `
    <div>
      <i class="${project.icon} project-icon"></i>
      <div class="d-inline-block">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
      </div>
    </div>
    <i class="fas fa-chevron-down collapse-icon"></i>
  `

  // Create collapsible content
  const collapseDiv = document.createElement("div")
  collapseDiv.className = project.id === "project1" ? "collapse show" : "collapse"
  collapseDiv.id = project.id

  const contentDiv = document.createElement("div")
  contentDiv.className = "project-content"

  // Add tabs
  const tabs = createSectionTabs(project.id, project.sections)
  contentDiv.appendChild(tabs)

  // Add sections
  Object.keys(project.sections).forEach((sectionKey) => {
    const sectionContent = createSectionContent(project.id, sectionKey, project.sections[sectionKey])
    contentDiv.appendChild(sectionContent)
  })

  collapseDiv.appendChild(contentDiv)

  projectCard.appendChild(header)
  projectCard.appendChild(collapseDiv)

  return projectCard
}

// Render all projects
function renderProjects(projectsData) {
  const projectsContainer = document.getElementById("projects-container")

  projectsData.forEach((project) => {
    const projectCard = createProjectCard(project)
    projectsContainer.appendChild(projectCard)
  })
}

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

// Initialize the application
function init() {
  // Use the actual data from data.js (global variables)
  loadTheme()
  createStatsCards(statsData) // Use global statsData from data.js
  renderProjects(projectsData) // Use global projectsData from data.js

  // Initialize Prism.js for syntax highlighting
  setTimeout(() => {
    if (typeof window !== "undefined" && window.Prism) {
      window.Prism.highlightAll()
    }
  }, 100)

  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Run initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  init()
})

// Configure Prism.js
if (typeof window !== "undefined" && window.Prism) {
  window.Prism.plugins.autoloader.languages_path = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/"
}
