/**
 *  @content  Symbol 学习
 *  @author   Leon
 *  @date     2023/04/19
 *  @email    ljw18186473933@gmail.com
 *
 */

// 需要先安装node
// 执行 node pwd path/currentfile.js

// 1. Symbol是一种基本数据类型,用于生成独一无二的值
// eg
const s = Symbol();
const a = Symbol();
console.log(s === a, typeof s);

// 2. Symbol()不是构造函数，不能使用new关键字
// eg
try {
  new Symbol();
} catch (error) {
  console.error(error);
}

// 3. Symbol入参接受一个字符串，用于描述放回的symbol值,切如果该
// 参数是一个对象 将会调用参数的toString()方法,将其转化为字符
// eg
const obj = {
  toString() {
    return "hello";
  },
};
const s1 = Symbol("s1");
const s2 = Symbol("s2");
const symObj = Symbol(obj);
console.log(s1, s2, symObj, obj.toString());

// 4. Symbol类型的值不能进行运算，但可以显示转化为string&boolean两种类型
// eg
const sym = Symbol("hello");

try {
  `this is a symbol value "${sym}"`;
} catch (error) {
  console.error(error);
}

const stringSym = String(sym);
const booleanSym = Boolean(sym);
console.log(
  stringSym,
  booleanSym,
  !booleanSym,
  true && !booleanSym,
  stringSym.slice(0, 3)
);

// 5. Symbol作为属性名时，只能通过变量形式读取和复制，即Object[objectName],
// 不能通过**.**的方式读取，因为.运算符读取的时字符串
// eg
const objectKey = Symbol("key");
const b = {};
b.objectKey = "test";
console.log(b.objectKey, b[objectKey], b["objectKey"]);
b[objectKey] = "objectValue";
console.log(b.objectKey, b[objectKey], b["objectKey"]);

// 6. Symbol值作为对象的属性名时，只可以被Object.getOwnPropertySymbols()和Reflect.ownKeys()获取
// eg
const obj2 = {};
obj2[Symbol("A")] = "hello";
obj2[Symbol("B")] = "Symbol";
obj2.C = "C";

for (let i in obj2) {
  console.log("==========>", i);
}

console.log(Object.keys(obj2));
console.log(Object.getOwnPropertySymbols(obj2));
console.log(Reflect.ownKeys(obj2));

// 7. Symbol.for()搜索是否该值已注册，如果没有，新建一个，有则返回存在的值
// Symbol.keyFor()返回存在的Symbol类型的key
// eg
const a1 = Symbol.for("a1");
const a2 = Symbol.for("a1");
console.log(a1 === a2);
console.log(Symbol.keyFor(a1), Symbol.keyFor(a2));
