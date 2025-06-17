function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function parseReferenceString(input) {
  return input.split(/[,.]/)
    .map(x => x.trim())
    .filter(x => x !== '')
    .map(x => parseInt(x))
    .filter(x => !isNaN(x));
}

function validateInputs(referenceStringInput, frameCountInput) {
  const referenceString = parseReferenceString(referenceStringInput.value);
  const frameCount = parseInt(frameCountInput.value);
  
  if (referenceString.length === 0) {
    alert('Please enter a valid page reference string (e.g., 7,0,1,2,0,3,0,4,2,3)');
    return null;
  }
  
  if (frameCount < 1 || frameCount > 10) {
    alert('Number of frames must be between 1 and 10');
    return null;
  }
  
  return { referenceString, frameCount };
}