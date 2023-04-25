/**
 *  @content  Proxy 学习
 *  @author   Leon
 *  @date     2023/04/21
 *  @email    ljw18186473933@gmail.com
 *  @update   2023/04/25
 *
 */

// 需要先安装node
// 执行 node pwd path/currentfile.js

// 1.Proxy意味代理，可以对目标对象添加代理操作,属于元编程
// 即对编程语言进行编程
// eg
const obj = new Proxy(
  { a: "2" },
  {
    get: (target, propkey, reciver) => {
      console.log(`getting ${propkey}`);
      return Reflect.get(target, propkey, reciver);
    },
    set: (target, propkey, value, receiver) => {
      console.log(`setting ${propkey}`, target, value, receiver);
      return Reflect.set(target, propkey, value + 1, receiver);
    },
  }
);

obj.number = 1;
++obj.number;
console.log(obj.number);
//此处对对象属性的读写操作进行了拦截

// 2.Proxy的实例可以作为其他对象的原型
// eg
const proxy = new Proxy(
  {},
  {
    get: (target, propkey, receiver) => {
      return "a";
    },
  }
);

const obj1 = Object.create(proxy);
console.log(obj1.b);

// 3. Proxy的拦截实例的操作类型有13种
// get、set、has、deleteProperty、ownKeys、getOwnPropertyDescriptor
// defineProperty、preventExtensions、getPrototypeOf、isExtensible、
// setPrototypeOf、apply、construct

const proxy1 = new Proxy(
  function (x, y) {
    return { a: x + y };
  },
  {
    get: (target, propkey) => {
      if (propkey === "toString") {
        return Object.toString;
      }
      return "proxy===>" + propkey;
    },
    apply: (target, bind, args) => {
      return "target has apply ";
    },
    construct: (target, args) => {
      console.log(args);
      return [...args.flat()].map((i) => i + 4);
    },
    has: (target, propkey) => {
      console.log(target(), propkey);
      return !(propkey in target());
    },
    ownKeys: (target) => {
      return target(1, 2);
    },
  }
);
console.log(proxy1(1, 2));
console.log(new proxy1([1, 2])); // {value: 2}
console.log(proxy1.toString === Object.toString); // true
console.log(proxy1.foo === "proxy===>foo"); // true
console.log("a" in proxy1); // false
console.log(proxy1.a); //proxy===>a
const target = {
  a: 1,
  b: 2,
  c: 3,
};
const proxy2 = new Proxy(target, {
  ownKeys: (target) => {
    console.log("did rewrite", target);
    return Object.keys(target).filter((i) => i !== "a");
  },
  defineProperty: (target, key, description) => {
    // 忽略d属性的定义
    if (key === "d") {
      return false;
    }
    // 属性只可以首次赋值,后面禁止修改
    if (!description.writable) {
      return target;
    }
    description.writable = false;
    target[key] = description.value + "hahah";
    return target;
  },
  deleteProperty: (target, key) => {
    //只删除a
    if (key === "a") {
      delete target.a;
    }
    return target;
  },
  getOwnPropertyDescriptor: (target, key) => {
    // 对g属性进行拦截修改, 修改值和配置
    if (key === "g") {
      Object.defineProperty(target, "g", {
        value: "custom g",
        configurable: false,
        writable: false,
        enumerable: true,
      });
    }
    return Object.getOwnPropertyDescriptor(target, key);
  },
});
// 2,3
for (let key of Object.keys(proxy2)) {
  console.log(target[key]);
}
proxy2.d = "ddd";
proxy2.f = "fff";
proxy2.f = "test changed";
proxy2.e = "eee";
console.log(proxy2); // { a: 1, b: 2, c: 3, f: 'fffhahah', e: 'eeehahah' }
delete proxy2.a;
delete proxy2.b;
delete proxy2.c;
console.log(proxy2); // { b: 2, c: 3, f: 'fffhahah', e: 'eeehahah' }
proxy2.g = "hahahg";
console.log(
  Object.getOwnPropertyDescriptor(proxy2, "g"),
  Object.getOwnPropertyDescriptor(proxy2, "b"),
  proxy2.g
);
// {
//   value: 'custom g',
//   writable: false,
//   enumerable: true,
//   configurable: false
// }
//{ value: 2, writable: true, enumerable: true, configurable: true }
// custom g

// 4.this指向问题
// eg
const targetObj = {
  h: () => {
    console.log(this === proxy3);
  },
};

const proxy3 = new Proxy(targetObj, {});

targetObj.h(); // false
proxy3.h(); // true 此处的this指向了proxy3
