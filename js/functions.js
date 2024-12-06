function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('проверяемая строка', 10);

function checkPalindrome (string) {
  string = string.replaceAll(' ','').toLowerCase();
  let invertedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    invertedString += string[i];
  }
  return invertedString === string;
}

checkPalindrome('Топот');

function extractNumbers (string) {
  string = String(string);
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
}

extractNumbers('1 кефир, 0.5 батона');

//Функция, определяющая выходит ли встреча за рамки рабочего дня
const checkMeetingDuration = function (workStartTime, workEndTime, meetingStart, meetingDuration) {

  const convertHoursToMinutes = function (timeInHours) {
    const [hours, minutes] = timeInHours.split(':');
    return Number(hours) * 60 + Number(minutes);
  };
  const workStartTimeInMinutes = convertHoursToMinutes(workStartTime);
  const workEndTimeInMinutes = convertHoursToMinutes(workEndTime);
  const meetingStartInMinutes = convertHoursToMinutes(meetingStart);

  return (meetingStartInMinutes >= workStartTimeInMinutes) && (meetingStartInMinutes + meetingDuration <= workEndTimeInMinutes);
};

checkMeetingDuration('08:00', '17:30', '14:00', 90);
checkMeetingDuration('8:0', '10:0', '8:0', 120);
checkMeetingDuration('08:00', '14:30', '14:00', 90);
checkMeetingDuration('14:00', '17:30', '08:0', 90);
checkMeetingDuration('8:00', '17:30', '08:00', 900);
