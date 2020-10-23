
const { isValidNumber } = require('validate-data-type');
const week1 = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const week2 = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
const YEAR = 'yyyy';
const SINGLEYEAR = 'yy';
const MM = 'mm';
const M = 'm';
const DAY = 'dd';
const SINGLEDAY = 'd';
const HOUR = 'hh';
const SINGLEHOUR = 'h';
const SECOUND = 'ss';
const SINGLESECOUND = 's';
const WEEK1 = '周';
const WEEK2 = '星期';
const WEEK3 = 'week';
const WEEK4 = 'w';
const AM = 'am';
const PM = 'pm';
const BLANK = ' ';

const defaultFormat = 'yyyy-mm-dd hh:mm:ss';
const addZero = value => value >= 0 && value < 10 ? '0' + value : value;
function getDate(timestamps) {
  const d = isValidNumber(timestamps) ? new Date(timestamps) : new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  const week = d.getDay();
  const milliseconds = d.getMilliseconds();
  return { year, month, day, hours, minutes, seconds, milliseconds, week }
}

//判断是否是年月日的mm
function isMouth(item) {
  if (item.includes(MM)) return item.includes(YEAR) || item.includes(DAY);
  if (item.includes(M)) return item.includes(SINGLEYEAR) || item.includes(SINGLEDAY);
}
//判断是否是时分秒的mm
function isMinute(item) {
  if (item.includes(MM)) return item.includes(HOUR) || item.includes(SECOUND);
  if (item.includes(M)) return item.includes(SINGLEHOUR) || item.includes(SINGLESECOUND);
}
function getNoon(hour) {
  return hour > 12 ? '下午' : '上午';
}

/**
 * 
 * @param {number} timestamps 时间戳
 * @param {string} format 日期格式
 * @returns {string}
 */
function format(timestamps, formatType = defaultFormat) {
  const { year, month, day, hours, minutes, seconds, week } = getDate(timestamps);
  formatType = formatType.split(BLANK);
  for (let i = 0; i < formatType.length; i++) {
    let item = formatType[i];
    //年月日
    if (isMouth(item)) item = item.replace(MM, addZero(month));
    if (isMouth(item)) item = item.replace(M, month);
    if (item.includes(YEAR)) item = item.replace(YEAR, year);
    if (item.includes(SINGLEYEAR)) item = item.replace(SINGLEYEAR, year.toString().substr(2));
    if (item.includes(DAY)) item = item.replace(DAY, addZero(day));
    if (item.includes(SINGLEDAY)) item = item.replace(SINGLEDAY, day);
    //时分秒
    if (isMinute(item)) item = item.replace(MM, addZero(minutes));
    if (isMinute(item)) item = item.replace(M, minutes);
    if (item.includes(HOUR)) item = item.replace(HOUR, addZero(hours));
    if (item.includes(SINGLEHOUR)) item = item.replace(SINGLEHOUR, hours);
    if (item.includes(SECOUND)) item = item.replace(SECOUND, addZero(seconds));
    if (item.includes(SINGLESECOUND)) item = item.replace(SINGLESECOUND, seconds);
    //星期
    if (item.includes(WEEK1)) item = item.replace(WEEK1, week1[week - 1]);
    if (item.includes(WEEK3)) item = item.replace(WEEK3, week1[week - 1]);
    if (item.includes(WEEK4)) item = item.replace(WEEK4, week1[week - 1]);
    if (item.includes(WEEK2)) item = item.replace(WEEK2, week2[week - 1]);
    //上午下午
    if (item.includes(AM)) item = item.replace(AM, getNoon(hours));
    if (item.includes(PM)) item = item.replace(PM, getNoon(hours));
    formatType[i] = item;
  }
  return formatType.join(BLANK);
}


module.exports = {
  // getTime
  format,
}