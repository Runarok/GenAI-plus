function atbashCipher() {
  const text = document.getElementById("textInput").value;
  if (!text) {
    alert("Please enter text.");
    return;
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const reversed = "ZYXWVUTSRQPONMLKJIHGFEDCBA";

  let resultHTML = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const upperChar = char.toUpperCase();
    const index = alphabet.indexOf(upperChar);

    if (index !== -1) {
      // It's a letter, map to Atbash equivalent
      let cipherChar = reversed[index];
      // Preserve case
      if (char === char.toLowerCase()) {
        cipherChar = cipherChar.toLowerCase();
      }
      resultHTML += `<tr>
        <td>${i}</td>
        <td>${char}</td>
        <td>${cipherChar}</td>
      </tr>`;
    } else {
      // Non-letter, remains unchanged
      resultHTML += `<tr>
        <td>${i}</td>
        <td>${char}</td>
        <td>${char}</td>
      </tr>`;
    }
  }

  document.getElementById("resultTable").innerHTML = resultHTML;
  document.getElementById("tableContainer").style.display = "block";
}

document.getElementById("cipherBtn").addEventListener("click", atbashCipher);
