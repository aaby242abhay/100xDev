/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase().replace(/[^\w\s]/g, '').split(' ').join('');

  let n = str.length;
  let flag = true;
  for(let i=0; i<n; i++){
    if(str[i] != str[n-1-i]){
      flag = false;
      break;
    }
  }
  return flag;
}

module.exports = isPalindrome;
