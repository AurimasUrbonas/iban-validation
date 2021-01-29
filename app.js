const checkButton = document.querySelector('#check-button');
const ibanInput = document.querySelector('#iban');

const ibanValidation = e => {
  e.preventDefault();

  const iban = ibanInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

  // Check if length is correct
  if(iban.length == 20) {
    alert('iban length is correct');

    // Move four initial chars to the end
    const movedIban = iban.slice(4) + iban.slice(0, 4);

    // Replace each letter in the string with two digits
    const replacedIban = movedIban.replace(/[A-Z]/g, letter => letter.charCodeAt(0) - 55);
    console.log(replacedIban);

    // Interpret the string as a decimal integer and compute the remainder of that number on division by 97
    let checksum = replacedIban.slice(0, 2);
    let fragment;
    for (let offset = 2; offset < replacedIban.length; offset += 7) {
      fragment = String(checksum) + replacedIban.substring(offset, offset + 7);
      checksum = parseInt(fragment, 10) % 97;
    }
    console.log(checksum);

  } else {
    alert('iban length is incorrect');
  }
}

checkButton.addEventListener('click', ibanValidation);
