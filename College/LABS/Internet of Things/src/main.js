function generateContent() {
  const tocList = document.getElementById('toc-list');
  const programsContainer = document.getElementById('programs-container');
  const searchInput = document.getElementById('search');

  function highlightCode(code) {
    // First highlight the <QUES> tags
    code = code.replace(
      /(<QUES>.*?<\/QUES>)/g,
      '<span class="highlight-question">$1</span>'
    );
    return code;
  }

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

  function showProgram(program) {
    programsContainer.innerHTML = '';
    
    const section = document.createElement('section');
    
    const title = document.createElement('h2');
    title.textContent = program.title;
    
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy Code';
    copyBtn.className = 'copy-btn';
    
    const pre = document.createElement('pre');
    pre.innerHTML = highlightCode(program.code);

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
  }

  // Generate Table of Contents
  programs.forEach((program, index) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = program.title;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      showProgram(program);
      // Update active state
      document.querySelectorAll('#toc-list a').forEach(link => link.classList.remove('active'));
      a.classList.add('active');
    });
    li.appendChild(a);
    tocList.appendChild(li);
  });

  // Show first program by default
  if (programs.length > 0) {
    showProgram(programs[0]);
    tocList.querySelector('a').classList.add('active');
  }

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPrograms = programs.filter(program => 
      program.title.toLowerCase().includes(searchTerm) ||
      program.code.toLowerCase().includes(searchTerm)
    );
    
    if (filteredPrograms.length > 0) {
      showProgram(filteredPrograms[0]);
    } else {
      programsContainer.innerHTML = '<p class="no-results">No matching programs found</p>';
    }

    // Update TOC visibility
    document.querySelectorAll('#toc-list li').forEach(li => {
      const link = li.querySelector('a');
      const matches = programs.find(p => p.title === link.textContent)?.title.toLowerCase().includes(searchTerm);
      li.style.display = matches ? 'block' : 'none';
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', generateContent);