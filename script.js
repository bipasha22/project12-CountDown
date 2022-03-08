const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

// console.log(items);

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// months are 0 index base [0-11]
// let upcomingDate = new Date(2022, 3, 24, 11, 30, 0);
// console.log(upcomingDate);
const upcomingDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

const year = upcomingDate.getFullYear();
const hours = upcomingDate.getHours();
const minutes = upcomingDate.getMinutes();

// for months
let month = upcomingDate.getMonth();
month = months[month];
// console.log(months[month]);
// for days
const date = upcomingDate.getDate();
// for weekdays
const weekday = weekdays[upcomingDate.getDay()];

// console.log(weekday); => 0 index based

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes} am`;

// time in ms
const futureTime = upcomingDate.getTime();
// console.log(futureTime);

function getRemainingTime() {
  const today = new Date().getTime();
  // console.log(today);

  const t = futureTime - today;
  // console.log(t);

  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60 mins
  // 1d = 24hrs

  // values in ms (1d= hr*min*s*ms)

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;
  // calc all values
  let days = t / oneDay;
  days = Math.floor(days);
  // console.log(days);
  // to get the remaining time
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMin);
  let seconds = Math.floor((t % oneMin) / 1000);

  // SET values array

  const values = [days, hours, minutes, seconds];

  // function for values < 10
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });
  // clearInterval
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry this giveaway has expired</h4>`;
  }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
