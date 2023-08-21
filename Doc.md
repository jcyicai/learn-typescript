#### 说明
- js 类型是动态的
- typescript 是为了 js 引入静态类型特征
  
#### 静态类型优点
- 有利于代码静态分析。有了静态类型，不必运行代码，就可以确定变量的类型，从而推断代码有没有错误，即静态分析。
- 有利于发现错误
- 更好的 IDE 支持，做到语法提示和智能补全
- 提供了代码文档
- 有助于代码重构
- TypeScript 有助于提高代码质量，保证代码安全，更适合用在大型的企业级项目

#### 静态类型缺点
- 丧失了动态类型的代码灵活性
- 增加了编程工作量
- 更高的学习成本
- 引入了独立的编译步骤
- 兼容性问题
- TypeScript 不一定适合那些小型的、短期的个人项目

#### 值和类型
- TypeScript 代码只涉及类型，不涉及值。所有跟“值”相关的处理，都由 JavaScript 完成。
- TypeScript 项目里面，其实存在两种代码，一种是底层的“值代码”，另一种是上层的“类型代码”。前者使用 JavaScript 语法，后者使用 TypeScript 的类型语法。

#### any 类型
- 变量类型一旦设为any，TypeScript 实际上会关闭这个变量的类型检查
- 污染其他变量
```javascript
let x:any = 'hello';
let y:number;

y = x; // 不报错

y * 123 // 不报错
y.toFixed() // 不报错
```
- 使用场景：
  - 出于特殊原因，需要关闭某些变量的类型检查，就可以把该变量的类型设为any。
  - 为了适配以前老的 JavaScript 项目，让代码快速迁移到 TypeScript，可以把变量类型设为any。有些年代很久的大型 JavaScript 项目，尤其是别人的代码，很难为每一行适配正确的类型，这时你为那些类型复杂的变量加上any，TypeScript 编译时就不会报错。

#### unknown 类型
- 表示类型不确定，可以是任意类型，视为严格版的 any 类型
- unknown 类型的变量，不能直接赋值给其他类型的变量（除了any类型和unknown类型）
```javascript
let v:unknown = 123;
let v1:boolean = v; // 报错
let v2:number = v; // 报错
```
- 不能直接调用unknown类型变量的方法和属性
```javascript
let v1:unknown = { foo: 123 };
v1.foo  // 报错

let v2:unknown = 'hello';
v2.trim() // 报错

let v3:unknown = (n = 0) => n + 1;
v3() // 报错
```
- unknown类型变量能够进行的运算是有限的，只能进行比较运算（运算符==、===、!=、!==、||、&&、?）、取反运算（运算符!）、typeof运算符和instanceof运算符这几种，其他运算都会报错。
- 正确使用 unknown，只有经过类型缩小
```javascript
let a:unknown = 1;
if (typeof a === 'number') {
  let r = a + 10; // 正确
}
```

#### never 类型
- 空类型，不包含任何值
- 特点，可以赋值给任意其他类型
- 为什么never类型可以赋值给任意其他类型呢？这也跟集合论有关，空集是任何集合的子集。TypeScript 就相应规定，任何类型都包含了never类型。因此，never类型是任何其他类型所共有的，TypeScript 把这种情况称为“底层类型”（bottom type）。
- TypeScript 有两个“顶层类型”（ any 和 unknown ），但是“底层类型”只有 never 唯一一个

#### 值 类型
- 以下 x 值类型为 'hello'
```javascript
let x:'hello';
x = 'hello'; // 正确
x = 'world'; // 报错

// x 的类型是 "https"
const x = 'https';

// y 的类型是 string
const y:string = 'https';

// ts 推断 x 为 number 类型 ，而 5 是 number 的子类型， number 是 5 的父类型，所以 4 + 1 为 number类型， 父类型不能赋值给子类型 所以报错
const x:5 = 4 + 1; // 报错  
let x:5 = 5;
let y:number = 4 + 1;

x = y; // 报错  父类型 y 不能赋值给 子类型 x
y = x; // 正确  子类型 x 可以赋值给 父类型 y

const x:5 = (4 + 1) as 5; // 正确 使用类型断言
```

#### 联合类型
```javascript
let x:string|number;
x = 123; // 正确
x = 'abc'; // 正确

// 添加竖扛 支持多行书写
let x:
  | 'one'
  | 'two'
  | 'three'
  | 'four';

// 进行类型缩小 来处理 否则将报错
function printId(
  id:number|string
) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}  
```

#### 交叉类型
- 主要用途是表示对象的合成
```javascript
let obj:
  { foo: string } &
  { bar: string };

obj = {
  foo: 'hello',
  bar: 'world'
};
```

#### type 命令
- 用来定义一个类型的别名
- 别名不允许重名
- 别名作用域是块作用域
- 别名允许嵌套

```javascript
// 定义类型别名
type Age = number;
let age:Age = 55;

// 不允许重名
type Color = 'red';
type Color = 'blue'; // 报错

// 块作用域 不会影响外层
type Color = 'red';
if (Math.random() < 0.5) {
  type Color = 'blue';
}

// 允许嵌套别名
type World = "world";
type Greeting = `hello ${World}`;
```

#### typeof 运算符
- typeof 值不能是类型 type 也不能是运算式

```javascript
// 返回都是 字符串
typeof undefined; // "undefined"
typeof true; // "boolean"
typeof 1337; // "number"
typeof "foo"; // "string"
typeof {}; // "object"
typeof parseInt; // "function"
typeof Symbol(); // "symbol"
typeof 127n // "bigint"
typeof null // "object"

// 返回的不是字符串 而是该值类型
const a = { x: 0 };
type T0 = typeof a;   // { x: number }
type T1 = typeof a.x; // number

type T = typeof Date(); // 报错 不能是运算式

type Age = number;
type MyAge = typeof Age; // 报错 不能为值类型
```

#### 数组 类型
- 只读模式 添加 readonly
- 由于只读数组是数组的父类型，所以它不能代替数组
- readonly关键字不能与数组的泛型写法一起使用（`ReadonlyArray<number>` `eadonly<number[]>`）
```javascript
let arr:number[] = [1, 2, 3];
let arr:Array<number> = [1, 2, 3]; // Array 接口写法
let arr:Array<number|string>

// 括号必须 否则被认为 number | string[] 联合类型
let arr:(number|string)[];

// 只读数组
const arr:readonly number[] = [0, 1];

arr[1] = 2; // 报错
arr.push(3); // 报错
delete arr[0]; // 报错

// 由于只读数组是数组的父类型，所以它不能代替数组
function getSum(s:number[]) {}
const arr:readonly number[] = [1, 2, 3];
getSum(arr) // 报错 使用类型断言解决  getSum(arr as number[])

// 报错 readonly 不能与数组泛型一起用
const arr:readonly Array<number> = [0, 1];
// 改用以下写法
const a1:ReadonlyArray<number> = [0, 1];
const a2:Readonly<number[]> = [0, 1];

// 多维数组 T[][]
var multi:number[][] =
  [[1,2,3], [23,24,25]];
```

#### 元组 类型
- 成员类型写在方括号里面的就是元组，写在外面的就是数组
- 成员类型可以自由设置的数组，即数组的各个成员的类型可以不同

```javascript
const s:[string, string, boolean] = ['a', 'b', true];
```