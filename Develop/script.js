var specialCharacters = ['!', '@', '#', '$', '^', '*', '&', '+', '-', '_'];
var generateBtn = document.querySelector("#generate");
var lowerCaseAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var upperCaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getPasswordOptions() {

  var length = parseInt(prompt('How many characters would you like your password to contain?'));
  
  if (Number.isNaN(length)) {
    alert('Password length must be provided as a number');
    return null;
  }

  var hasSpecialCharacters = confirm('Click OK to confirm including special characters.');

   
   var passwordOptions = {
    length: length,
    hasSpecialCharacters: hasSpecialCharacters,
   }

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
  possibleCharacters = possibleCharacters.concat(lowerCaseAlphabet, upperCaseAlphabet);
  
  guaranteedCharacters.push(getRandom(lowerCaseAlphabet));
  guaranteedCharacters.push(getRandom(upperCaseAlphabet));
  
  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  for (var i = 0; i < options.length; i++) {
    var possibleCharacter = getRandom(possibleCharacters);
    result.push(possibleCharacter);
  }
  
  for (var i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }

    return result.join('');
}

function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

generateBtn.addEventListener("click", writePassword);
