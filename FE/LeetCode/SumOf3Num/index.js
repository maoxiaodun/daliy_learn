/**
 *  @content  三数之和
 *  @author   Leon
 *  @date     2023/05/6
 *  @email    ljw18186473933@gmail.com
 *  @remark   假设给定一个数组s，求数组中的s[i] + s[j] +s[k] = 0的所有可能值, i,j,k互不相等, 输出[[result1],[result2]],result1和result2不等，如果没有结果则返回空数组[]
 *
 */

var threeSum = function (nums) {
  let res = [];
  if (nums.length < 3) return res;
  const newNums = nums.sort((x, y) => x - y);
  for (let i = 0; i < newNums.length; i++) {
    // 如果当前的值与上一个值相等 跳过循环
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    let l = i + 1;
    let r = newNums.length - 1;
    //两指针向中间移动
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum == 0) {
        res.push([nums[i], nums[l], nums[r]]);
        //先去重，直至sum不为0
        while (l < r && nums[l] == nums[l + 1]) l++;
        while (l < r && nums[r] == nums[r - 1]) r--;
        l++;
        r--;
      } else if (sum < 0) l++; //sum < 0 左指针移动
      else if (sum > 0) r--; //sum > 0 右指针移动
    }
  }
  return res;
};
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
