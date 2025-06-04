import { programs } from './data/IOT.js';

function generateContent() {
  const tocList = document.getElementById('toc-list');
  const programsContainer = document.getElementById('programs-container');
  const searchInput = document.getElementById('search');

  function createPinConfigTable(pinConfig) {
    const table = document.createElement('table');
    table.className = 'pin-config';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Pin</th>
        <th>Component</th>
      </tr>
    `;
    
    const tbody = document.createElement('tbody');
    pinConfig.forEach(({ pin, component }) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${pin}</td>
        <td>${component}</td>
      `;
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
  }

  function renderPrograms(filteredPrograms = programs) {
    programsContainer.innerHTML = '';
    
    filteredPrograms.forEach((program, index) => {
      const section = document.createElement('section');
      section.id = `program${index + 1}`;
      
      const title = document.createElement('h2');
      title.textContent = program.title;
      
      const copyBtn = document.createElement('button');
      copyBtn.textContent = 'Copy Code';
      copyBtn.className = 'copy-btn';
      
      const pre = document.createElement('pre');
      pre.textContent = program.code;

      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(program.code);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy Code';
        }, 1500);
      });

      section.appendChild(title);
      if (program.pinConfig) {
        section.appendChild(createPinConfigTable(program.pinConfig));
      }
      section.appendChild(copyBtn);
      section.appendChild(pre);
      
      programsContainer.appendChild(section);
    });
  }

  // Generate Table of Contents
  programs.forEach((program, index) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#program${index + 1}`;
    a.textContent = program.title;
    li.appendChild(a);
    tocList.appendChild(li);
  });

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPrograms = programs.filter(program => 
      program.title.toLowerCase().includes(searchTerm) ||
      program.code.toLowerCase().includes(searchTerm)
    );
    renderPrograms(filteredPrograms);
  });

  // Initial render
  renderPrograms();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', generateContent);