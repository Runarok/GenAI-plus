let currentStep = 0;
let explanationSteps = [];

function cleanInput(str) {
  return str.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
}

function buildMatrix(keyword) {
  let seen = {};
  let matrix = [];
  let explanation = [];
  let key = cleanInput(keyword);

  explanation.push('<span class="step-label">Step 1: Build the 5x5 Key Matrix</span>');
  explanation.push('Keyword (after cleaning and replacing J with I): <b>' + key + '</b>');

  let keyLetters = '';
  for (let c of key) {
    if (!seen[c] && c >= 'A' && c <= 'Z') {
      keyLetters += c;
      seen[c] = true;
    }
  }
  explanation.push('Add letters from keyword (no duplicates): <b>' + keyLetters.split('').join(' ') + '</b>');

  for (let i = 0; i < 26; i++) {
    let c = String.fromCharCode(65 + i);
    if (c === 'J') continue;
    if (!seen[c]) {
      keyLetters += c;
      seen[c] = true;
    }
  }
  explanation.push('Fill remaining letters (A-Z except J): <b>' + keyLetters.split('').join(' ') + '</b>');
  explanation.push('<span class="note">Note: I and J are treated as the same letter.</span>');

  for (let r = 0; r < 5; r++) {
    let row = [];
    for (let c = 0; c < 5; c++) {
      row.push(keyLetters[r * 5 + c]);
    }
    matrix.push(row);
  }

  let matrixString = '<div class="matrix-container"><table class="matrix-table">';
  for (let r = 0; r < 5; r++) {
    matrixString += '<tr>';
    for (let c = 0; c < 5; c++) {
      matrixString += '<td>' + matrix[r][c] + '</td>';
    }
    matrixString += '</tr>';
  }
  matrixString += '</table></div>';

  explanation.push('Key Matrix:');
  explanation.push(matrixString);

  return { matrix, explanation };
}

function processPairs(message, mode) {
  let cleaned = cleanInput(message);
  let pairs = [];
  let explanation = [];
  let i = 0;

  explanation.push('<span class="step-label">Step 2: Prepare the Message</span>');
  explanation.push('Cleaned message: <b>' + cleaned + '</b>');

  if (mode === 'encrypt') {
    while (i < cleaned.length) {
      let a = cleaned[i];
      let b = cleaned[i + 1];
      if (!b) {
        pairs.push([a, 'X']);
        explanation.push('Last letter "' + a + '" has no pair, pad with X: <b>' + a + 'X</b>');
        break;
      }
      if (a === b) {
        pairs.push([a, 'X']);
        explanation.push('Pair "' + a + a + '" has repeated letters, insert X: <b>' + a + 'X</b>');
        i += 1;
      } else {
        pairs.push([a, b]);
        explanation.push('Pair: <b>' + a + b + '</b>');
        i += 2;
      }
    }
    explanation.push('Final pairs: <b>' + pairs.map(p => p.join('')).join(' ') + '</b>');
  } else {
    while (i < cleaned.length) {
      let a = cleaned[i];
      let b = cleaned[i + 1] || 'X';
      pairs.push([a, b]);
      explanation.push('Pair: <b>' + a + b + '</b>');
      i += 2;
    }
    explanation.push('Pairs ready for decryption: <b>' + pairs.map(p => p.join('')).join(' ') + '</b>');
  }

  return { pairs, explanation };
}

function findPosition(matrix, letter) {
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (matrix[r][c] === letter) {
        return { r, c };
      }
    }
  }
  return null;
}

function cipherPair(pair, matrix, mode) {
  let A = pair[0];
  let B = pair[1];

  let posA = findPosition(matrix, A);
  let posB = findPosition(matrix, B);

  let r1 = posA.r;
  let c1 = posA.c;
  let r2 = posB.r;
  let c2 = posB.c;

  let resA, resB;
  let explanation = [];

  explanation.push('<span class="step-label">Process pair: <b>' + A + B + '</b></span>');

  // Helper for matrix HTML with highlights for A and B
  function renderMatrixHighlight(rA, cA, rB, cB) {
    let html = '<table class="matrix-table">';
    for (let r = 0; r < 5; r++) {
      html += '<tr>';
      for (let c = 0; c < 5; c++) {
        let classes = '';
        if ((r === rA && c === cA) || (r === rB && c === cB)) {
          classes = 'highlight';
        }
        html += `<td class="${classes}">${matrix[r][c]}</td>`;
      }
      html += '</tr>';
    }
    html += '</table>';
    return html;
  }

  // Same row
  if (r1 === r2) {
    explanation.push('Both letters in the <b>same row</b> (row ' + (r1 + 1) + ').');
    if (mode === 'encrypt') {
      c1 = (c1 + 1) % 5;
      c2 = (c2 + 1) % 5;
      explanation.push(`Move each letter one position to the right.`);
    } else {
      c1 = (c1 + 4) % 5; // -1 mod 5
      c2 = (c2 + 4) % 5;
      explanation.push(`Move each letter one position to the left.`);
    }
    resA = matrix[r1][c1];
    resB = matrix[r2][c2];
    explanation.push('Encrypted/Decrypted pair: <b>' + resA + resB + '</b>');
    explanation.push(renderMatrixHighlight(r1, c1, r2, c2));
  }
  // Same column
  else if (c1 === c2) {
    explanation.push('Both letters in the <b>same column</b> (column ' + (c1 + 1) + ').');
    if (mode === 'encrypt') {
      r1 = (r1 + 1) % 5;
      r2 = (r2 + 1) % 5;
      explanation.push(`Move each letter one position down.`);
    } else {
      r1 = (r1 + 4) % 5;
      r2 = (r2 + 4) % 5;
      explanation.push(`Move each letter one position up.`);
    }
    resA = matrix[r1][c1];
    resB = matrix[r2][c2];
    explanation.push('Encrypted/Decrypted pair: <b>' + resA + resB + '</b>');
    explanation.push(renderMatrixHighlight(r1, c1, r2, c2));
  }
  // Rectangle rule
  else {
    explanation.push('Letters form a <b>rectangle</b>. Swap columns.');
    resA = matrix[r1][c2];
    resB = matrix[r2][c1];
    explanation.push('Encrypted/Decrypted pair: <b>' + resA + resB + '</b>');
    explanation.push(renderMatrixHighlight(r1, c2, r2, c1));
  }

  return { result: resA + resB, explanation };
}

function runPlayfair() {
  currentStep = 0;
  explanationSteps = [];

  const keyword = document.getElementById('keyword').value.trim();
  const message = document.getElementById('message').value.trim();
  const mode = document.querySelector('input[name="mode"]:checked').value;

  if (!keyword) {
    alert('Please enter a keyword.');
    return;
  }
  if (!message) {
    alert('Please enter a message.');
    return;
  }

  // Step 1: Build matrix
  const { matrix, explanation: matrixExp } = buildMatrix(keyword);
  explanationSteps.push({ type: 'text', content: matrixExp });

  // Step 2: Prepare pairs
  const { pairs, explanation: pairsExp } = processPairs(message, mode);
  explanationSteps.push({ type: 'text', content: pairsExp });

  // Step 3: Process each pair
  let processedText = '';
  for (let i = 0; i < pairs.length; i++) {
    const { result, explanation } = cipherPair(pairs[i], matrix, mode);
    explanationSteps.push({ type: 'text', content: explanation });
    processedText += result;
  }

  // Step 4: Final output
  explanationSteps.push({ type: 'final', content: processedText });

  // Show first step
  currentStep = 0;
  showStep();

  // Show pagination
  document.getElementById('pagination').style.display = 'flex';
}

function showStep() {
  const output = document.getElementById('output');
  output.innerHTML = '';

  if (explanationSteps.length === 0) {
    output.innerHTML = '<p>No steps to show.</p>';
    document.getElementById('pagination').style.display = 'none';
    return;
  }

  let step = explanationSteps[currentStep];

  if (step.type === 'text') {
    step.content.forEach(line => {
      output.innerHTML += '<p class="explanation">' + line + '</p>';
    });
  } else if (step.type === 'final') {
    output.innerHTML = `<p class="final-output">Final ${document.querySelector('input[name="mode"]:checked').value === 'encrypt' ? 'Ciphertext' : 'Plaintext'}:<br /><b>${step.content}</b></p>`;
  }

  document.getElementById('stepIndicator').textContent = `Step ${currentStep + 1} of ${explanationSteps.length}`;

  // Enable/disable buttons
  document.getElementById('prevBtn').disabled = currentStep === 0;
  document.getElementById('nextBtn').disabled = currentStep === explanationSteps.length - 1;
}

function nextStep() {
  if (currentStep < explanationSteps.length - 1) {
    currentStep++;
    showStep();
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep();
  }
}
