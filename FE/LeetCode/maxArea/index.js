/**
 *  @content  判断盛水最多的容器
 *  @author   Leon
 *  @date     2023/05/4
 *  @email    ljw18186473933@gmail.com
 *  @remark   假设将数组的下标作为x轴, 数组的值作为y轴, 以x轴为底边, y轴为高，求任意两个左边之间的最大面积，求在给定一个数组中, 找出可以盛水最多的面积,
 *
 */

var maxArea = function (height) {
  let max = 0;
  let i = 0;
  let m = height.length - 1;
  for (i = 0, m = height.length - 1; i < m; ) {
    max = Math.max(max, (m - i) * Math.min(height[i], height[m]));
    if (height[i] < height[m]) {
      i++;
    } else {
      m--;
    }
  }
  return max;
};

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
