function selectShipping(element) {
  document.querySelectorAll('.shipping').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');
}

function selectPayment(element) {
  document.querySelectorAll('.payment').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');
}