/**
 *  @content  判断字符串是否为回文
 *  @author   Leon
 *  @date     2023/04/27
 *  @email    ljw18186473933@gmail.com
 *
 */
var isPalindrome = function (x) {
  if (x < 0) {
    return false;
  }
  return x === Number(String(x).split("").reverse().join(""));
};
