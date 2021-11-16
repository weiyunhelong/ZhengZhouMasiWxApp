//时间转为 2018/03/28  18:08:38
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//不满10，补0
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//得到当前的日期 YYYY-MM-dd
function getNowDate() {
  var date = new Date();
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

//得到当前的日期 YYYY-MM-dd
function getNowDate2() {
  var date = new Date();
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('')
}


//得到当前的日期年份
function getCurrYear() {
  var date = new Date();
  var year = date.getFullYear();
  return year
}

//得到当前的日期月份
function getCurrMonth() {
  var date = new Date();;
  var month = date.getMonth() + 1;
  return month
}

//得到当前的日期日子
function getCurrDay() {
  var date = new Date();

  var day = date.getDate();
  return day
}


//得到当前的日期 YYYY年MM月dd日
function getMorenDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return year + '年   ' + month + '月' + day + '日'
}

//得到选中的日期 日期数据拆分成YYYY年MM月dd日
function getSelectDate(riqi) {
  var date = riqi.split('-');
  var year = date[0];
  var month = date[1];
  var day = date[2];
  return year + '年' + month + '月' + day + '日'
}

//得到日期的年
function getSelectYear(riqi) {
  var date = riqi.split('-');
  var year = parseInt(date[0]);
  return year
}

//得到日期的月
function getSelectMonth(riqi) {
  var date = riqi.split('-');
  var month = parseInt(date[1]);
  return month
}

//得到日期的日
function getSelectDay(riqi) {
  var date = riqi.split('-');
  var day = parseInt(date[2]);
  return day
}

//得到2日期比较
function getCompairDate(start, end) {

  var onedate = Date.parse(start);
  var twodate = Date.parse(end);

  if (onedate >= twodate) {
    return false;
  } else {
    return true;
  }
}

//得到当前的时间 时分秒
function getNowTime() {
  var date = new Date();
  var hour = date.getHours()
  var minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}

//得到月份的天数
function getDayNum(year, month) {
  var result = 30;
  //31天的月份
  if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
    result = 31;
  } //2月份的天数
  else if (month == 2) {
    //闰年
    if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
      result = 29;
    } //平年
    else {
      result = 28;
    }
  }
  return result;
}

//得到星期几
function getWeekDay(year, month, day) {
  var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
  var date = Date.parse(year + "-" + month + "-" + day);
  var day = date.getDay();
  return show_day[day];
}

//得到本月的第几周
function getWeekNum(year, month, day) {
  var date = new Date(year, parseInt(month) - 1, day),
    w = date.getDay(),
    d = date.getDate();
  return Math.ceil((d + 6 - w) / 7);
}

//得到本年的第几周
function getYearNum(year, month, day) {
  var date1 = new Date(year, parseInt(month) - 1, day),
    date2 = new Date(year, 0, 1),
    d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
  return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
}

//两个时间相差天数 兼容firefox chrome
function getDayCount(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式  
  var dateSpan, tempDate, iDays;

  sDate1 = Date.parse(sDate1);
  sDate2 = Date.parse(sDate2);

  dateSpan = sDate2 - sDate1;
  dateSpan = Math.abs(dateSpan);
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  return iDays;
};

//2个时间的时间差
function getDateDiff(startTime, endTime, diffType) {
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
  startTime = startTime.replace(/\-/g, "/");
  endTime = endTime.replace(/\-/g, "/");
  //将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase();
  var sTime = new Date(startTime); //开始时间
  var eTime = new Date(endTime); //结束时间
  //作为除数的数字
  var timeType = 1;
  switch (diffType) {
    case "second":
      timeType = 1000;
      break;
    case "minute":
      timeType = 1000 * 60;
      break;
    case "hour":
      timeType = 1000 * 3600;
      break;
    case "day":
      timeType = 1000 * 3600 * 24;
      break;
    default:
      break;
  }
  return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
}

//时间戳转日期时间(yyyy-MM-dd hh:mm:ss)
function formatToDateTime(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

//时间戳转日期(yyyy-mm-dd)
function formatToDate(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
}

//时间戳转时间(hh:mm:ss)
function formatToTime(inputTime) {
  var date = new Date(inputTime);
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return h + ':' + minute + ':' + second;
}

//时间戳转时间(hh:mm:ss)
function DateTimeToChuo(inputTime) {
  var date = new Date(inputTime);

  return date.getTime();
}


//获取近一年的月份，从当前月份开始计算
function GetYearMonthByCurr() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var result = [];
  for (var i = 0; i < 6; i++) {
    var cmonth = month + i;
    if (cmonth > 12) {
      var cyear = year + 1;
      var montht = cmonth - 12;
      var dt = cyear + "年" + montht + "月";
      result.push(dt);
    } else {
      var dt = year + "年" + cmonth + "月";
      result.push(dt);
    }
  }
  return result;
}

//获取当前月份的开始和结束日期
function GetYMMaxDate(year, month) {
  var date = new Date();
  var maxday = getDayNum(year, month);
  month = month < 10 ? "0" + month : month;
  var startday = "";
  if (date.getFullYear() == year && month == (date.getMonth() + 1)) {
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    startday = year + "-" + month + "-" + day;
  } else {
    startday = year + "-" + month + "-" + "01";
  }

  var endday = year + "-" + month + "-" + maxday;
  return [startday, endday];
}

//两个时间相差天数 兼容firefox chrome
function GetChaDayCount(sDate1) { //sDate1是2006-12-18格式  
  var dateSpan, iDays;


  sDate1 = Date.parse(sDate1);
  var sDate2 = Date.parse(new Date());

  var dateTime = new Date();
  dateTime = dateTime.setDate(dateTime.getDate() + 1);
  dateTime = new Date(dateTime);
  //var sDate2 = Date.parse(dateTime);

  dateSpan = sDate1 - sDate2;
  iDays = dateSpan / (24 * 3600 * 1000);
  return iDays;
};

//获取指定日期后的第days的日期
function DayAddCount(date, days) { //sDate1是2006-12-18格式  

  var date = new Date(date);
  date.setDate(date.getDate() + days);

  var month = date.getMonth() + 1;
  var day = date.getDate();
  return date.getFullYear() + '-' + formatNumber(month) + '-' + formatNumber(day);

};
//获取指定日期后的第days的日期
function DayAddCount2(date, days) { //sDate1是2006-12-18格式  

  var date = new Date(date);
  date.setDate(date.getDate() + days);

  var month = date.getMonth() + 1;
  var day = date.getDate();
  return date.getFullYear() + '' + formatNumber(month) + '' + formatNumber(day);

};

//获取指定日期后的第days的日期
function DayAddCount3(date, days) { //sDate1是2006-12-18格式  

  var date = new Date(date);
  date.setDate(date.getDate() + days);

  var month = date.getMonth() + 1;
  var day = date.getDate();
  return date.getFullYear() + '-' + formatNumber(month) + '-' + formatNumber(day);

};

//获取指定日期后的第days的日期
function DayAddCount4(dt, days) { //sDate1是20061218格式  
  dt = dt + "";
  var dts = dt.substring(0, 4) + "/" + dt.substring(4, 6) + "/" + dt.substring(6, 8)
  var date = new Date(dts);
  date.setDate(date.getDate() + days);

  var month = date.getMonth() + 1;
  var day = date.getDate();
  return date.getFullYear() + '' + formatNumber(month) + '' + formatNumber(day);

};

//数字日期转日期格式
function Day2Str(date) { //date格式为20200906
  date = date + '';
  var year = date.substr(0, 4);
  var month = date.substr(4, 5);
  var day = date.substr(6, 7);
  return year + '-' + formatNumber(month) + '-' + formatNumber(day);
}

//日期转数字日期格式
function Str2Date(date) { //date格式为2020-09-06
  date = date + '';
  var year = date.split('-')[0];
  var month = date.split('-')[1];
  var day = date.split('-')[2];
  return year + '' + month + '' + day;
}

//得到一周的日期范围
function getWeekDays(year, month, tian) {
  var now=new Date();
  var d = new Date(year + "/" + month + "/" + tian),
    day = d.getDay(),
    days = [];

  for (var i = day; i > 0; i--) {  
    var dt=new Date(d.getTime()-1000*60*60*24*i); 
    var nian = new Date(dt).getFullYear();
    var yue = new Date(dt).getMonth() + 1;
    var ri = new Date(dt).getDate();
    var dtobj = {
      year: nian,
      month: yue < 10 ? '0' + yue : yue,
      day: ri < 10 ? '0' + ri : ri,
      choosed:false
    };
    days.push(dtobj);
  }
  for (var j = 0; j < 7 - day; j++) {
    var dt=new Date(d.getTime()+1000*60*60*24*j); 
    var nian = new Date(dt).getFullYear();
    var yue = new Date(dt).getMonth() + 1;
    var ri = new Date(dt).getDate();
    var dtobj = {
      year: nian,
      month: yue < 10 ? '0' + yue : yue,
      day: ri < 10 ? '0' + ri : ri,
      choosed:nian==now.getFullYear()&&now.getMonth()+1==yue&&ri==now.getDate()
    };
    days.push(dtobj);
  }
  return days;
}

module.exports = {
  formatTime: formatTime, //时间的格式化
  getNowDate: getNowDate, //得到当前的日期:2018-03-28
  getNowDate2: getNowDate2, //得到当前的日期:20180328
  getNowTime: getNowTime, //得到当前的时间:18:08
  getMorenDate: getMorenDate, //得到当前的时间:2018年03月28日
  getSelectDate: getSelectDate, //转化为时间2018年03月28日
  getCompairDate: getCompairDate, //比较时间的大小 
  getSelectYear: getSelectYear, //得到选择的年
  getSelectMonth: getSelectMonth, //得到选择的月
  getSelectDay: getSelectDay, //得到选择的日
  getDayNum: getDayNum, //得到月份对应的天数
  getWeekDay: getWeekDay, //得到星期几
  getWeekNum: getWeekNum, //得到日期所在月的周数
  getYearNum: getYearNum, //得到日期所在年的周数
  getDayCount: getDayCount, //得到2个日期相差的天数
  getDateDiff: getDateDiff, //得到时间差
  formatToDateTime: formatToDateTime, //时间戳转日期时间格式.格式为:2018-03-28 18:05:38
  formatToDate: formatToDate, //时间戳转日期格式.格式为:2018-03-28
  formatToTime: formatToTime, //时间戳转时间格式.格式为:18: 05:38
  DateTimeToChuo: DateTimeToChuo, //时间转为时间戳
  getCurrYear: getCurrYear, //得到当前的年份
  getCurrMonth: getCurrMonth, //得到当前的年份
  getCurrDay: getCurrDay, //得到当前的年份
  GetYearMonthByCurr: GetYearMonthByCurr, //得到近一年的年月
  GetYMMaxDate: GetYMMaxDate, //得到指定年月份的日期范围
  GetChaDayCount: GetChaDayCount, //获取是否是当天
  DayAddCount: DayAddCount, //天数相加
  DayAddCount2: DayAddCount2, //天数相加
  DayAddCount3: DayAddCount3, //天数相加
  DayAddCount4: DayAddCount4,
  Day2Str: Day2Str, //数字日期转日期格式
  Str2Date: Str2Date, //字符串日期转日期格式
  getWeekDays: getWeekDays, //获取一周的时间范围
}