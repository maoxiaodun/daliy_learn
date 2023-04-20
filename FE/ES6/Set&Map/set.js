/**
 *  @content  set 学习
 *  @author   Leon
 *  @date     2023/04/20
 *  @email    ljw18186473933@gmail.com
 *
 */

// 需要先安装node
// 执行 node pwd path/currentfile.js

// 1.set是一种新的数据结构,与数组类似，但其包含的值都是唯一的 没有重复的值
// Set是一个构造函数,用来生成Set数据结构
// eg
const set1 = new Set([1, 2, 3, 4, 5, 4, 5]); //可以接受数组或者其他具有 iterable 接口的数据结构
const set2 = new Set(set1);
console.log(set1, set2, Object.prototype.toString.call(set1), Array.from(set1));
set1.add(4); // add方法可以像结构里面添加新成员
console.log(set1);
set1.add(6);
console.log(set1);
set1.add([7, 8]);
console.log(set1);

// 2.利用Set成员的唯一性可以去重
// eg
const array1 = [2, 1, 3, 2, 4, 2, 1, 2, 3, 4, 5];
console.log([...new Set(array1)], Array.from(new Set(array1))); //数组去重

const string1 = "abccbaddffe";
console.log([...new Set(string1)].join("")); //字符串去重

// 3. Set判断的是值是否相等，而且是全等判断，这意味着类型的不同和引用类型都会判断成不同的值
// eg
const set3 = new Set();
set3.add("1");
set3.add(1);
set3.add({});
set3.add({});
set3.add([]);
set3.add([]);
set3.add(new Set());
set3.add(new Set());
console.log(set3);
set3.add(NaN);
set3.add(NaN);
console.log(set3, NaN === NaN); //NaN是个例外 在set中被认为是相等的

// 4. Set实例具有的方法和属性
// size, add(), delete(), has(), clear()
// eg
console.log(set3.size);
set3.delete(NaN);
console.log(set3.size, set3);
console.log(set3.has([]), set3.has(1)); //引用类型的字面量是不相等
set3.clear();
console.log(set3, set1);

// 5. SetS实例具有的遍历方法
// keys(), values(), entries()
// eg
const set4 = new Set(["hello", "cs", "and", "world"]);

// 获取Set的key集合
for (let item of set4.keys()) {
  console.log(item);
}

// 获取Set的Values集合
for (let item of set4.values()) {
  console.log(item);
}

// 获取Set的Entries集合,Entries会获取键值,Set的键值都是一样的
for (let item of set4.entries()) {
  console.log(item);
}

// foreach遍历
set4.forEach((i) => console.log(i));

// 扩展运算符遍历
[...set4].map((i) => console.log(i));

// 6. WeakSet, Set的变种结构，与Set不同的有
// 1. WeakSet成员只能是对象,
// 2.WeakSet的对象引用是弱引用, 弱引用意味WeakMap里的成员是不稳定的
// 3.WeakSet因其成员的不确定性, 所以没有size属性和遍历方法
// eg

const Ws = new WeakSet();
const d = {};
Ws.add(d);
console.log(Ws, Ws.has(d));
const obj = {
  a: {
    c: 1,
  },
};
Ws.add(obj.a);
console.log(Ws, Ws.has(obj.a));
const arr2 = [obj.a]; 
delete obj.a;
console.log(arr2, Ws.has(obj.a)); 
