/**
 *  @content  有效符号
 *  @author   Leon
 *  @date     2023/05/11
 *  @email    ljw18186473933@gmail.com
 *  @remark   假设给定一个由'(',')','[',']','{','}'这些符号组成的无需字符串,需要判断其是有效闭合字符，即左括号必须要有右括号闭合，且闭合里面只能嵌入闭合符号，不能嵌入单开单闭符号
 *  如 '({)}' 这种是非法的， 合法的如下 {}() ,({[]})
 *
 */

// 解法一  栈解
var isValid = function (s) {
  //只有单个符号 直接判断位false 无法闭合
  if (s.length === 1) {
    return false;
  }
  let leftArr = []; //匹配左开符号
  let rightArr = []; //匹配右闭符号

  // 以左开符号为key,右闭合符号为value的对象
  const pattnerObj = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  for (let i = 0; i < s.length; i++) {
    // 如果左开符号存在，入栈
    if (pattnerObj[s[i]]) {
      leftArr.push(s[i]);
    } else {
      //如果左开对应的右闭合符号值存在，则左开符号出栈
      if (
        leftArr.length > 0 &&
        pattnerObj[leftArr[leftArr.length - 1]] === s[i]
      ) {
        leftArr.pop();
      } else {
        //没有则单独压入右闭合栈内
        rightArr.push(s[i]);
      }
    }
  }
  // 如果左开符号和右闭合符号的栈都为空 则代表该字符串是合法的
  return leftArr.length === 0 && rightArr.length === 0;
};

console.log(isValid("[{()}]"), isValid("[]{)}{"));

// 解法二 消消乐解法
var isValid2 = function (s) {
  let len = s.length;
  // 奇数字符串即不能有效闭合 返回false
  if (len % 2 !== 0) {
    return false;
  }
  // 如果满足闭合条件，循环的次数 即为字符串 /2
  let length = len / 2;
  for (let i = 0; i < length; i++) {
    //将满足条件的闭合字符消掉，因为如果字符串满足，不管是（）{}[] 还是 [{()}]形式，都会有一个闭合字符被replace
    s = s.replace("()", "");
    s = s.replace("{}", "");
    s = s.replace("[]", "");
  }
  //判断s的长度，为空则代表满足有效闭合
  return s.length === 0;
};

console.log(isValid2("[{()}]"), isValid2("[]{)}{"));
