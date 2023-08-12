var specialCharacters = ['!', '@', '#', '$', '^', '*', '&', '+', '-', '_'];
var generateBtn = document.querySelector("#generate");
var lowerCaseAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var upperCaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var numericCharacters = '0123456789'.split('');

function getPasswordOptions() {
  var minLength = 8;
  var maxLength = 128;
  var length = parseInt(prompt('How many characters would you like your password to contain?'));
  
  if (Number.isNaN(length) || length < minLength || length > maxLength) {
    alert('Password length must be provided as a number. 8 - 128 characters.');
    return null;
  }

  var hasLowerCase = confirm('Click OK to confirm including lowercase characters.');
  var hasUpperCase = confirm('Click OK to confirm including uppercase characters.');
  var hasNumericCharacters = confirm('Click OK to confirm including numeric characters.');
  var hasSpecialCharacters = confirm('Click OK to confirm including special characters.');

  if (!hasLowerCase && !hasUpperCase && !hasNumericCharacters && !hasSpecialCharacters) {
    alert('You must choose at least on character type to include in your password.'); 
    return null;
  }
  
  var passwordOptions = {
    length: length,
    hasLowerCase: hasLowerCase,
    hasUpperCase: hasUpperCase,
    hasNumericCharacters: hasNumericCharacters,
    hasSpecialCharacters: hasSpecialCharacters,
  };

  return passwordOptions;
}

function getRandom(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  var randElement = arr[randIndex];
  return randElement;
}

function generatePassword() {
  var options = getPasswordOptions();
  var result = [];
  var possibleCharacters = [];
  var guaranteedCharacters = [];

  if (!options) return null;
  
  if (options.hasLowerCase) {
    possibleCharacters = possibleCharacters.concat(lowerCaseAlphabet);
    guaranteedCharacters.push(getRandom(lowerCaseAlphabet));
  }

  if (options.hasUpperCase) {
    possibleCharacters = possibleCharacters.concat(upperCaseAlphabet);
    guaranteedCharacters.push(getRandom(upperCaseAlphabet));
  }

  if (options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }
  
  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

    // Make sure the guaranteed characters are shuffled and appear in random positions.
  for (var i = guaranteedCharacters.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [guaranteedCharacters[i], guaranteedCharacters[j]] = [guaranteedCharacters[j], guaranteedCharacters[i]];
  }

    // Generate the remaining characters based on the desired password length.
  for (var i = guaranteedCharacters.length; i < options.length; i++) {
    var possibleCharacter = getRandom(possibleCharacters);
    result.push(possibleCharacter);
  }

    // Concatenate the guaranteed characters and the remaining characters to form the final password.
  result = result.concat(guaranteedCharacters);
    // Convert the array of characters into a string and return the password.
  return result.join('');
}

function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.textContent = password;
}

generateBtn.addEventListener("click", writePassword);





