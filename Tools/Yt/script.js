const input = document.getElementById("input");
const output = document.getElementById("output");

function formatTranscript() {
    let text = input.value;
    // Remove timestamps + accessibility text
    text = text.replace(
        /^\s*\d{1,2}(?::\d{2}){1,2}\s*(?:\d+\s*hour[s]?,?\s*)?(?:\d+\s*minute[s]?,?\s*)?(?:\d+\s*second[s]?)?\s*/gmi,
        ""
    );
    // Remove empty lines
    text = text.replace(/^\s*[\r\n]/gm, "");
    // Remove extra blank lines
    text = text.replace(/\n{3,}/g, "\n\n");
    output.value = text.trim();
}
async function copyOutput() {
    if (!output.value) return;
    await navigator.clipboard.writeText(output.value);
    const buttons = document.querySelectorAll("button");
    const copyButton = buttons[1];
    const old = copyButton.innerHTML;
    copyButton.innerHTML = "✅ Copied";
    setTimeout(() => {
        copyButton.innerHTML = old;
    }, 1500);
}

function clearText() {
    input.value = "";
    output.value = "";
    input.focus();
}
// Ctrl+Enter formats the transcript
document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "Enter") {
        formatTranscript();
    }
});