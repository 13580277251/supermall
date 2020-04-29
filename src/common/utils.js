export function formatDate(date, fmt) {
  // 1.获取年份
  if (/(y+)/.test(fmt)) {
    // RegExp.$1指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
    // substr为截取多少位字符，截取多少位取决于传过来多少位'y'
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2.获取月日时分秒
  // 加'+'表示至少一个，多了不限
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
// 年份和其他分开处理得当原因是，年份可能有四位，其他固定只有两位
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
