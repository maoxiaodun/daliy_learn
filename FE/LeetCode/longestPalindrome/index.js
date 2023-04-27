/**
 *  @content  longestPalindrome 学习
 *  @author   Leon
 *  @date     2023/04/27
 *  @email    ljw18186473933@gmail.com
 *
 */

// 中心扩展法
// 回文串的特点是从中心出发,两边的字符都是相等,所以解体思路可以是,
// 以当前坐标字符为中心,向两边搜寻,左边递减直至为0,右边递增至字符长度,如果有字符相等,则将下标运算
// 如果字符不等,返回以左边界至右边界的字符串
var longestPalindrome = function (s) {
  let palindrome = (s, l, r) => {
    while (l >= 0 && r < s.length && s[l] == s[r]) {
      // 向两边展开
      l--;
      r++;
    }
    // 返回以s[l]和s[r]为中心的最长回文串
    return s.slice(l + 1, r);
  };
  let res = "";
  for (let i = 0; i < s.length; i++) {
    // 以s[i]为中心的最长回文串
    let s1 = palindrome(s, i, i);
    // 以s[i]和s[i+1]为中心的最长回文串
    let s2 = palindrome(s, i, i + 1);
    res = res.length > s1.length ? res : s1;
    res = res.length > s2.length ? res : s2;
  }
  return res;
};

console.time();
console.log(
  longestPalindrome(
    "zudfweormatjycujjirzjpyrmaxurectxrtqedmmgergwdvjmjtstdhcihacqnothgttgqfywcpgnuvwglvfiuxteopoyizgehkwuvvkqxbnufkcbodlhdmbqyghkojrgokpwdhtdrwmvdegwycecrgjvuexlguayzcammupgeskrvpthrmwqaqsdcgycdupykppiyhwzwcplivjnnvwhqkkxildtyjltklcokcrgqnnwzzeuqioyahqpuskkpbxhvzvqyhlegmoviogzwuiqahiouhnecjwysmtarjjdjqdrkljawzasriouuiqkcwwqsxifbndjmyprdozhwaoibpqrthpcjphgsfbeqrqqoqiqqdicvybzxhklehzzapbvcyleljawowluqgxxwlrymzojshlwkmzwpixgfjljkmwdtjeabgyrpbqyyykmoaqdambpkyyvukalbrzoyoufjqeftniddsfqnilxlplselqatdgjziphvrbokofvuerpsvqmzakbyzxtxvyanvjpfyvyiivqusfrsufjanmfibgrkwtiuoykiavpbqeyfsuteuxxjiyxvlvgmehycdvxdorpepmsinvmyzeqeiikajopqedyopirmhymozernxzaueljjrhcsofwyddkpnvcvzixdjknikyhzmstvbducjcoyoeoaqruuewclzqqqxzpgykrkygxnmlsrjudoaejxkipkgmcoqtxhelvsizgdwdyjwuumazxfstoaxeqqxoqezakdqjwpkrbldpcbbxexquqrznavcrprnydufsidakvrpuzgfisdxreldbqfizngtrilnbqboxwmwienlkmmiuifrvytukcqcpeqdwwucymgvyrektsnfijdcdoawbcwkkjkqwzffnuqituihjaklvthulmcjrhqcyzvekzqlxgddjoir"
  )
);
console.timeEnd();
