function generateContent() {
  const tocList = document.getElementById('toc-list');
  const programsContainer = document.getElementById('programs-container');
  const searchInput = document.getElementById('search');

  // Add styles for code highlighting
  const style = document.createElement('style');
  style.textContent = `
    .highlight {
      color: #0000FF;
    }
    pre {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    .pin-config {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
    }
    .pin-config th, .pin-config td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .pin-config th {
      background-color: #f2f2f2;
    }
  `;
  document.head.appendChild(style);

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
    section.className = 'program-section';
  
    const title = document.createElement('h2');
    title.textContent = program.title;
  
    const description = document.createElement('div');
    description.className = 'description';
  
    let descriptionText = '';
    let codeText = '';
  
    // Check if <QUES> and </QUES> exist in program.code
    const hasQuesTags = program.code.includes('<QUES>') && program.code.includes('</QUES>');
  
    if (hasQuesTags) {
      // Extract description between <QUES> and </QUES>
      const descMatch = program.code.match(/<QUES>([\s\S]*?)<\/QUES>/);
      if (descMatch && descMatch[1]) {
        descriptionText = descMatch[1].trim();
      }
  
      // The rest of the code after </QUES>
      const codeStartIndex = program.code.indexOf('</QUES>') + 7;
      codeText = program.code.slice(codeStartIndex).trim();
    } else {
      // No QUES tags, entire code is description (or code)
      descriptionText = program.code.trim();
      codeText = ''; // no separate code
    }
  
    // Add description (if any)
    if (descriptionText) {
      // Use textContent for safety (or innerHTML if you want formatting)
      description.textContent = descriptionText;
      section.appendChild(description);
    }
  
    // Create copy button & code container only if codeText exists
    if (codeText) {
      const copyBtn = document.createElement('button');
      copyBtn.textContent = 'Copy Code';
      copyBtn.className = 'copy-btn';
  
      const codeContainer = document.createElement('div');
      codeContainer.className = 'code-container';
  
      const pre = document.createElement('pre');
      pre.textContent = codeText; // preserve formatting
      codeContainer.appendChild(pre);
  
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeText);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy Code';
        }, 1500);
      });
  
      section.appendChild(copyBtn);
      section.appendChild(codeContainer);
    }
  
    // Pin config table (optional)
    if (program.pinConfig) {
      section.appendChild(createPinConfigTable(program.pinConfig));
    }
  
    section.insertBefore(title, section.firstChild);
    programsContainer.appendChild(section);
  }
 

  // Generate Table of Contents
  if (programs && programs.length > 0) {
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
  } else {
    tocList.innerHTML = '<li>No programs available</li>';
  }

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