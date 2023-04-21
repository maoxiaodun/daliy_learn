/**
 *  @content  Map 学习
 *  @author   Leon
 *  @date     2023/04/20
 *  @email    ljw18186473933@gmail.com
 *
 */

// 需要先安装node
// 执行 node pwd path/currentfile.js

// 1. Map结构和Object一样,是一个键值对合集,区别在于Object的key只能是字符串
// 而Map的key可以是各种类型的值, 即any => value, 而Object是 string => value
// eg

//传统对象
const obj = {};
const obj2 = { a: 1 };
obj[obj2] = 1;
console.log(obj); //输出{ '[object Object]': 1 }

// Map结构
const mapObj = new Map();
mapObj.set(obj2, "this is map value");
console.log(mapObj.get(obj2)); // 输出 ‘this is map value’

// 2.Map作为构造函数 接受具有Iterator接口,并且成员中的数组含有两个元素,
// 这两个元素会被作为键值对添加到Map结构中
// eg
const mapObj2 = new Map([
  ["key1", "hello"],
  ["key2", "world"],
]);
console.log(mapObj2.get("key1")); // hello
const set = new Set([["key3", "set"]]);
const mapObj3 = new Map(set);
console.log(mapObj3.get("key3")); // set
const mapObj4 = new Map(mapObj2);
console.log(mapObj4.get("key1")); // hello
mapObj4.set(mapObj2, mapObj3);
console.log(mapObj4.get(mapObj2)); // Map(1) { 'key3' => 'set' }

// 3.注意针对对象字面量时，如果未将其赋值与变量保存,是会被是为两个不同的键
// 因为字面量对象的地址并未保存
// eg
// bad
const mapObj5 = new Map();
mapObj5.set(["1"], "hahah");
console.log(mapObj5.get(["1"])); // undefined
// good
const a = ["1"];
mapObj5.set(a, "hahah");
console.log(mapObj5.get(a));

// 引用类型,只要地址不同,即key不同, 基本类型中,值相等即视为同一个值
// eg
const mapObj6 = new Map();
mapObj6.set(0, "1233").set(-0, 44);
console.log(mapObj6.get(0), mapObj6.get(-0), 0 === -0);

// NaN在Map中也被视为同一个值
mapObj6.set(NaN, "is NaN 1").set(NaN, "is NaN 2");
console.log(mapObj6.get(NaN));

// 4.Map实例拥有的方法和属性
// size, set, get, has, delete, clear
// eg
console.log(mapObj6.size);
mapObj6.set("ceshi", "test");
console.log(mapObj6.has("ceshi"), mapObj6.get("ceshi")); // true test
mapObj6.delete("ceshi");
console.log(mapObj6.has("ceshi"), mapObj6.get("ceshi")); // false  undefined
mapObj6.clear();
console.log(mapObj6); //Map(0) {}

// 遍历方法
// keys, values, entries, forEach
const mapObj7 = new Map([
  ["F", "no"],
  ["T", "yes"],
]);

for (let key of mapObj7.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of mapObj7.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of mapObj7.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者解构item
for (let [key, value] of mapObj7.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of mapObj7) {
  console.log(key, value);
}
// Map默认的iterator是 entries方法
console.log(mapObj7[Symbol.iterator] === mapObj7.entries);

mapObj7.forEach((value, key) => {
  console.log("Key: %s, Value: %s", key, value); //Key: T, Value: yes
});

// 5. WeakMap, map的变种结构,于Map结构不同的点在于
// 1. Map的key只接受对象即 any => value 变为 Object => value
// 2. 即Map用对象作为key时, key也是弱引用
// eg
const objMap8 = new Map();
const a1 = {
  a: {
    c: 1,
  },
};
const a2 = {
  b: {
    c: 2,
  },
};
const arr = [a1.a, a2.b];
objMap8.set(a1.a, "hahah").set(a2.b, "ddd");
console.log(arr, objMap8); //[ { c: 1 }, { c: 2 } ] Map(2) { { c: 1 } => 'hahah', { c: 2 } => 'ddd' }
delete a1.a;
delete a2.b;
console.log(arr, objMap8.has(a1.a)); //[ { c: 1 }, { c: 2 } ] false
