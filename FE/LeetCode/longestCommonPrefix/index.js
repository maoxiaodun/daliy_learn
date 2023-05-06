/**
 *  @content  longestCommonPrefix 学习
 *  @author   Leon
 *  @date     2023/05/04
 *  @email    ljw18186473933@gmail.com
 *  @remark   假设给定一个数组["flower","flow","flight"],要求输出数组中的每一项的公共前缀,如“fl",如果不存在公共前缀，返回空字符串 ""。
 *
 */

var longestCommonPrefix = function (strs) {
  //如果是空数组 直接输出""
  if (!strs.length) {
    return "";
  }
  //默认公共前缀为第一个元素
  let res = strs[0];
  //遍历给定的数组
  for (charts of strs) {
    //每次遍历都与公共数组求交集,
    for (let i = 0; i < res.length; i++) {
      //逐个元素比较，不符合的下标处中断循环，并且切割新的公共前缀
      if (charts[i] !== res[i]) {
        res = res.slice(0, i);
        break;
      }
    }
  }
  return res;
};
