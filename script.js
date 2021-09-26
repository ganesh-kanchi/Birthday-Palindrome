function stringReverse(string){
  var listOfChars = string.split("");
  var reverseListOfChars = listOfChars.reverse();


  var stringReversed = reverseListOfChars.join("");

  return stringReversed;
}
function isPalindrome(string){
  var reverse = stringReverse(string);
  // if (string === reverse){
  //   return true;
  // } else {
  //   return false;
  // }
  return string === reverse;
}

function convertDateToString(date){
  var dateString = { day: "", month: "", year: "" };

  if(date.day < 10){
    dateString.day = "0" + date.day
  }else{
    dateString.day = date.day.toString();
  }

  if(date.month < 10){
    dateString.month = "0" + date.month
  }else{
    dateString.month = date.month.toString();
  }

  dateString.year = date.year.toString();

  return dateString;
}

// var date = {
//   day:3,
//   month:6,
//   year:2021
// };

function getAllDateFormats(date){
  var dateString = convertDateToString(date);

  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd =  date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(2,4);
  var mmddyy = date.month + date.day + date.year.slice(2,4);
  var yymmdd = date.year.slice(2,4) + date.month + date.day;

  return[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}
var date = {
  day:3,
  month:6,
  year:2021
};

function checkPalindromeForAllDateFormats(date) {

  var dateFormatList = getAllDateFormats(date);

  var palindromeList = [];

  for (var i = 0; i < dateFormatList.length; i++) {
    var result = isPalindrome(dateFormatList[i]);
    palindromeList.push(result);
  }
  
  return palindromeList;
}

function isLeapYear(year) {

  if (year % 400 === 0)
    return true;

  if (year % 100 === 0)
    return false;

  if (year % 4 === 0)
    return true;

  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    }
    else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  }
  else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function getNextPalindromeDate(date) {

  var nextDate = getNextDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateString = convertDateToString(nextDate);
    var resultList = checkPalindromeForAllDateFormats(dateString);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    }
    else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      }
      else {
        day = 28;
      }
    }
    else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function getPreviousPalindromeDate(date) {

  var previousDate = getPreviousDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateString = convertDateToString(previousDate);
    var resultList = checkPalindromeForAllDateFormats(dateString);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
}

var birthdayDate = document.querySelector('#birthday');
var checkBtn = document.querySelector('#check-btn');
var outputDiv = document.querySelector('#output-div');

function clickHandler(e) {
  var bdayString = birthdayDate.value;

  if (bdayString !== '') {
    var date = bdayString.split('-');
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy)
    };

    var dateString = convertDateToString(date);
    var list = checkPalindromeForAllDateFormats(dateString);
    var isPalindrome = false;

    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        isPalindrome = true;
        break;
      }
    }

    if (!isPalindrome) {
      const [ctr1, nextDate] = getNextPalindromeDate(date);
      const [ctr2, prevDate] = getPreviousPalindromeDate(date);

      if (ctr1 > ctr2) {
        outputDiv.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`;
      } else {
        outputDiv.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`;
      }

    } else {
      outputDiv.innerText = 'Wow, Congratulations! Your birthday is a palindrome!';
    }
  }
}

checkBtn.addEventListener('click', clickHandler);
