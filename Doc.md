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
- readonly关键字不能与数组的泛型写法一起使用（`ReadonlyArray<number>` `Readonly<number[]>`）
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
- 使用元组时，必须明确给出类型声明（上例的`[number]`），不能省略，否则 TypeScript 会把一个值自动推断为数组。
- 元组成员的类型可以添加问号后缀（`?`），表示该成员是可选的
- 问号只能用于元组的尾部成员，也就是说，所有可选成员必须在必选成员之后
- 元素成员数量限制，`let x:[string, string] = ['a', 'b']; x[2] = 'c'; // 报错`
- 使用扩展运算符（...），可以表示不限成员数量的元组
- 如果不确定元组成员的类型和数量，可以使用 `any`，但这样也就失去了使用元组和 TypeScript 的意义
- 只读元组 `readonly []` 和 `Readonly<[number, string]>`
- 跟数组一样，只读元组是元组的父类型。所以，元组可以替代只读元组，而只读元组不能替代元组。

```javascript
const s:[string, string, boolean] = ['a', 'b', true];

// 添加 ? 成员可选
let a:[number, number?] = [1];

// ? 必须在必选成员之后
type myTuple = [
  number,  // 必选
  number,  // 必选 
  number?, // 可选
  string?  // 可选
];

// 使用 ... 可以不限成员数量的元组
type NamedNums = [
  string,
  ...number[]
];

const a:NamedNums = ['A', 1, 2];
const b:NamedNums = ['B', 1, 2, 3];

// 不确定成员类型和数量
type Tuple = [...any[]];

// 使用括号 读取成员
type Tuple = [string, number];
type Age = Tuple[1]; // number

// 只读元组
type t = readonly [number, string] // 写法一
type t = Readonly<[number, string]> // 写法二

// 成员类型推断
function f(
  point:[number, number?, number?]
) {
  if (point.length === 4) {} // 报错  可能是 1|2|3
}

// 扩展运算符与成员数量
const arr = [1, 2];
function add(x:number, y:number){}
add(...arr) // 报错  因为 add 只接收两个参数

// 方案一
// 修改为 元组 即可
const arr:[number, number] = [1, 2];

// 方案二
// 因为 TypeScript 会认为arr的类型是readonly [1, 2]，这是一个只读的值类型，可以当作数组，也可以当作元组。
const arr = [1, 2] as const;
```

#### symbol 类型
- TypeScript 设计了symbol的一个子类型unique symbol，它表示单个的、某个具体的 Symbol 值。
- 因为unique symbol表示单个值，所以这个类型的变量是不能修改值的，只能用const命令声明，不能用let声明。
- 每个声明为unique symbol类型的变量，它们的值都是不一样的，其实属于两个值类型。
- `const` 命令声明的变量，如果赋值为另一个 `symbol` 类型的变量，则推断类型为 `symbol`。
- `let` 命令声明的变量，如果赋值为另一个 `unique symbol` 类型的变量，则推断类型还是 `symbol`。

```javascript
const x:unique symbol = Symbol();
// 等同于
const x = Symbol();

const a:unique symbol = Symbol();
const b:unique symbol = Symbol();
a === b // 报错

// 类型推断
let x = Symbol(); // 类型为 symbol
const x = Symbol(); // 类型为 unique symbol

let x = Symbol();
const y = x; // 类型为 symbol

const x = Symbol();
let y = x; // 类型为 symbol
```

#### 函数
- 函数类型里面的参数名与实际参数名，可以不一致。
- 函数的实际参数个数，可以少于类型指定的参数个数，但是不能多于，即 TypeScript 允许省略参数。
- 如果一个变量要套用另一个函数类型，有一个小技巧，就是使用typeof运算符。
- 任何需要类型的地方，都可以使用typeof运算符从一个值获取类型。
- 如果函数的某个参数可以省略，则在参数名后面加问号表示。实际为 `原始类型 | undefined`。但是显示的设置为 `undefined`，则不能省略。
- 函数的可选参数只能在参数列表的尾部，跟在必选参数的后面。
- `void` 类型允许返回 `undefined` 或 `null`。
- 如果变量、对象方法、函数参数的类型是 void 类型的函数，那么并不代表不能赋值为有返回值的函数。恰恰相反，该变量、对象方法和函数参数可以接受返回任意值的函数，这时并不会报错。如果后面使用了这个函数的返回值，就违反了约定，则会报错。
- `never` 类型表示肯定不会出现的值。它用在函数的返回值，就表示某个函数肯定不会返回值，即函数不会正常执行结束。
- `never` 类型不同于 `void` 类型。前者表示函数没有执行结束，不可能有返回值；后者表示函数正常执行结束，但是不返回值，或者说返回 `undefined`。

```javascript
// void 没有返回值 不写 ts会自行推断
function hello(txt:string):void {
  console.log('hello ' + txt);
}

// 类型推断
// 写法一
const hello = function (txt:string) {
  console.log('hello ' + txt);
}

// 写法二 括号参数txt 必须 且 必须放在括号中
const hello: (txt:string) => void = function (txt) {
  console.log('hello ' + txt);
};

// 如果不写类型 会推断为 any
type MyFunc = (string, number) => number;
// (string: any, number: any) => number

// 参数名和实际参数名可以不一致
let f:(x:number) => number;
f = function (y:number) {
  return y;
};

// 实际参数个数可少于类型指定参数个数，但不能多于
let myFunc:
  (a:number, b:number) => number;

myFunc = (a:number) => a; // 正确
myFunc = (
  a:number, b:number, c:number
) => a + b + c; // 报错

// 套用另一个函数 使用 typeof
function add(x:number, y:number) {
  return x + y;
}
const myAdd:typeof add = function (x, y) {
  return x + y;
}

// 函数对象写法
let add:{
  (x:number, y:number):number
};
 
add = function (x, y) {
  return x + y;
};

{
  (参数列表): 返回值
}

// 接口写法
interface myfn {
  (a:number, b:number): number;
}

var add:myfn = (a, b) => a + b;

// 箭头函数
// people 为 Person[]   
// (name):Person  
// name类型省略 ts自行推断 
// ({name})返回一个对象
// (name):Person => {name} 如果这么写 代表一个函数体 由于没有 return 这个函数体不会返回任何值  所以 必须 加上 括号
type Person = { name: string };
const people = ['alice', 'bob', 'jan'].map(
  (name):Person => ({name})
);

// 正确
(name):Person => ({name})
// 错误
(name:Person) => ({name})
// 错误
name:Person => ({name})

// 可选参数 添加 ?  实际为 原始类型 | undefined
function f(x?:number) {}
f(); // OK
f(10); // OK
f(undefined) // 正确

// 函数的可选参数只能在参数列表的尾部，跟在必选参数的后面。
let myFunc: (a?:number, b:number) => number; // 报错

// 如果前面参数可能为空 则需显示的设置为 undefined
let myFunc: ( a:number|undefined, b:number ) => number;

// 参数默认值  
function createPoint(x:number = 0,y:number = 0):[number, number] {
  return [x, y];
}
createPoint() // [0, 0]

// 可选参数与默认值不能同时使用
function f(x?: number = 0) {} // 报错

// 参数解构
type ABC = { a:number; b:number; c:number };
function sum({ a, b, c }:ABC) {
  console.log(a + b + c);
}

// rest 函数剩余参数
// rest 参数为数组
function joinNumbers(...nums:number[]) {}

// rest 参数为元组
function f(...args:[boolean, number]) {}

// 类型为  void 类型的函数 可以接受返回任意值的函数
type voidFunc = () => void;
const f:voidFunc = () => {
  return 123;
};
f() * 2 // 报错  因为 f 函数设定为没有返回值

function f():void {
  return true; // 报错
}
 
const f3 = function ():void {
  return true; // 报错
};

// never 类型
function fail(msg:string):never {
  throw new Error(msg);
}

// void 和 never 区别  never表示函数没有执行结束，不可能有返回值；void表示函数正常执行结束，但是不返回值，或者说返回undefined。
// 正确
function sing():void {
  console.log('sing');
}

// 报错
function sing():never {
  console.log('sing');
  // 等同于 return undefined
}

// 高阶函数  一个函数的返回值还是一个函数，那么前一个函数就称为高阶函数
(someValue: number) => (multiplier: number) => someValue * multiplier;

// 由于重载是一种比较复杂的类型声明方法，为了降低复杂性，一般来说，如果可以的话，应该优先使用联合类型替代函数重载。
// 写法一
function len(s:string):number;
function len(arr:any[]):number;
function len(x:any):number {
  return x.length;
}

// 写法二
function len(x:any[]|string):number {
  return x.length;
}
```

#### 对象类型
- 属性的类型可以用分号结尾，也可以用逗号结尾。最后一个属性后面，可以写分号或逗号，也可以不写。
- 一旦声明了类型，对象赋值时，就不能缺少指定的属性，也不能有多余的属性。
- 如果属性值是一个对象，readonly修饰符并不禁止修改该对象的属性，只是禁止完全替换掉该对象。

```javascript
// 属性类型以分号结尾
type MyObj = {
  x:number;
  y:number;
};

// 属性类型以逗号结尾
type MyObj = {
  x:number,
  y:number,
};

const o1:MyObj = { x: 1 }; // 报错 缺少 y
const o2:MyObj = { x: 1, y: 1, z: 1 }; // 报错 多了 z

// 不能删除 属性 但可以对属性值修改
const myUser = {
  name: "Sabrina",
};
delete myUser.name // 报错
myUser.name = "Cynthia"; // 正确

// 对象的方法使用函数类型描述。
const obj:{
  x: number;
  y: number;
  add(x:number, y:number): number;
  // 或者写成
  // add: (x:number, y:number) => number;
} = {
  x: 1,
  y: 1,
  add(x, y) {
    return x + y;
  }
};

// 除了type命令可以为对象类型声明一个别名，TypeScript 还提供了interface命令，可以把对象类型提炼为一个接口。
// 写法一
type MyObj = {
  x:number;
  y:number;
};
const obj:MyObj = { x: 1, y: 1 };

// 写法二
interface MyObj {
  x: number;
  y: number;
}
const obj:MyObj = { x: 1, y: 1 };

// 可选属性 添加 ?  可选属性等同于允许赋值为undefined
const obj: {
  x: number;
  y?: number;
} = { x: 1 };

type User = {
  firstName: string;
  lastName?: string;
};

// 等同于
type User = {
  firstName: string;
  lastName?: string|undefined;
};

// 只读属性 不能修改值
interface MyInterface {
  readonly age: number;
}
const person:MyInterface = { age: 20 };
person.age = 21; // 报错

// 如果属性值是一个对象，readonly修饰符并不禁止修改该对象的属性，只是禁止完全替换掉该对象。
interface Home {
  readonly resident: {
    name: string;
    age: number
  };
}

const h:Home = {
  resident: {
    name: 'Vicky',
    age: 42
  }
};

h.resident.age = 32; // 正确
h.resident = {
  name: 'Kate',
  age: 23 
} // 报错

// 属性名的索引类型
type MyObj = {
  [property: string]: string
};

const obj:MyObj = {
  foo: 'a',
  bar: 'b',
  baz: 'c',
};

// 解构
const {id, name, price}:{
  id: string;
  name: string;
  price: number
} = product;
```

#### interface 接口
- interface 是对象的模板，可以看作是一种类型约定。使用了某个模板的对象，就拥有了指定的类型结构。
- 一个接口中，最多只能定义一个字符串索引。字符串索引会约束该类型中所有名字为字符串的属性。
- 属性的数值索引，其实是指定数组的类型。
- 一个接口中最多只能定义一个数值索引。
- 如果一个 interface 同时定义了字符串索引和数值索引，那么数值索性必须服从于字符串索引。因为在 JavaScript 中，数值属性名最终是自动转换成字符串属性名。
- 继承，如果子接口与父接口存在同名属性，那么子接口的属性会覆盖父接口的属性。注意，子接口与父接口的同名属性必须是类型兼容的，不能有冲突，否则会报错。
- 多重继承时，如果多个父接口存在同名属性，那么这些同名属性不能有类型冲突，否则会报错。
- 同名接口合并时，同一个属性如果有多个类型声明，彼此不能有类型冲突。
- 同名接口合并时，如果同名方法有不同的类型声明，那么会发生函数重载。而且，后面的定义比前面的定义具有更高的优先级。
- 同名方法之中，如果有一个参数是字面量类型，字面量类型有更高的优先级。
- 如果两个 interface 组成的联合类型存在同名属性，那么该属性的类型也是联合类型。
- `interface` 与 `type` 的区别
  - `type` 能够表示非对象类型，而 `interface` 只能表示对象类型（包括数组、函数等）。
  - `interface` 可以继承其他类型，`type` 不支持继承。（继承的主要作用是添加属性，type定义的对象类型如果想要添加属性，只能使用&运算符，重新定义一个类型。）
  - 同名 `interface` 会自动合并，同名 `type` 则会报错。也就是说，TypeScript 不允许使用 `type` 多次定义同一个类型。
  - `interface` 不能包含属性映射（mapping），`type` 可以
  - `this` 关键字只能用于 `interface`
  - `type` 可以扩展原始数据类型，`interface` 不行
  - `interface` 无法表达某些复杂类型（比如交叉类型和联合类型），但是 `type` 可以

```javascript
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

const p:Person = {
  firstName: 'Jason',
  lastName: 'Chen',
  age: 18
};

// [] 取出接口某属性类型
interface Foo {
  a: string;
}
type A = Foo['a']; // string

// 可选
interface Foo {
  x?: string;
}
// 只读
interface A {
  readonly a: string;
}
// 索引
interface A {
  [prop: string]: number;  // [prop: string]: any;
}

// 属性的数值索引 等同于指定数组类型
interface A {
  [prop: number]: string;
}
const obj:A = ['a', 'b', 'c'];

// 同时定义字符串和数值索引，数值必须服从字符串
interface A {
  [prop: string]: number;
  [prop: number]: string; // 报错
}
interface B {
  [prop: string]: number;
  [prop: number]: number; // 正确  服从了字符串索引 number类型
}

// 对象方法
// 写法一
interface A {
  f(x: boolean): string;
}
// 写法二
interface B {
  f: (x: boolean) => string;
}
// 写法三
interface C {
  f: { (x: boolean): string };
}

// 属性的表达式写法
const f = 'f';
interface A {
  [f](x: boolean): string;
}

// 类型方法重载
interface A {
  f(): number;
  f(x: boolean): boolean;
  f(x: string, y: string): string;
}

// 声明独立的函数
interface Add {
  (x:number, y:number): number;
}
const myAdd:Add = (x,y) => x + y;

// 构造函数
interface ErrorConstructor {
  new (message?: string): Error;
}

// 继承
interface Shape {
  name: string;
}
interface Circle extends Shape {
  radius: number;
}

// 多重继承
interface Style {
  color: string;
}
interface Shape {
  name: string;
}
interface Circle extends Style, Shape {
  radius: number;
}

// 子接口和父接口同名属性类型必须相同 否则报错
interface Foo {
  id: string;
}
interface Bar extends Foo {
  id: number; // 报错
}

// 多重继承 同名属性类型不同则报错
interface Foo {
  id: string;
}
interface Bar {
  id: number;
}
// 报错
interface Baz extends Foo, Bar {
  type: string;
}

// 继承 type
type Country = {
  name: string;
  capital: string;
}
interface CountryWithPop extends Country {
  population: number;
}

// 接口合并 最终返回三个属性
interface Box {
  height: number;
  width: number;
}
interface Box {
  length: number;
}

// 同名接口合并，相同属性类型必须相同
interface A {
  a: number;
}
interface A {
  a: string; // 报错
}

// 同名接口合并时，如果同名方法有不同的类型声明，那么会发生函数重载。而且，后面的定义比前面的定义具有更高的优先级。
interface Cloner {
  clone(animal: Animal): Animal;
}
interface Cloner {
  clone(animal: Sheep): Sheep;
}
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}
// 等同于
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}

// 同名方法之中，如果有一个参数是字面量类型，字面量类型有更高的优先级。
interface A {
  f(x:'foo'): boolean;
}
interface A {
  f(x:any): void;
}
// 等同于
interface A {
  f(x:'foo'): boolean;
  f(x:any): void;
}

// 如果两个 interface 组成的联合类型存在同名属性，那么该属性的类型也是联合类型。
interface Circle {
  area: bigint;
}
interface Rectangle {
  area: number;
}
declare const s: Circle | Rectangle;
s.area;   // bigint | number

// type 继承
type Animal = {
  name: string
}
type Bear = Animal & {
  honey: boolean
}

// interface 和 type 互相继承
interface Foo { x: number; }
type Bar = Foo & { y: number; };

type Foo = { x: number; };
interface Bar extends Foo {
  y: number;
}

// type 同名会报错  interface 则可以
type A = { foo:number }; // 报错
type A = { bar:number }; // 报错

interface A { foo:number };
interface A { bar:number };
const obj:A = {
  foo: 1,
  bar: 1
};

// interface不能包含属性映射（mapping），type可以
interface Point {
  x: number;
  y: number;
}

// 正确
type PointCopy1 = {
  [Key in keyof Point]: Point[Key];
};

// 报错
interface PointCopy2 {
  [Key in keyof Point]: Point[Key];
};

// this关键字只能用于interface
// 正确
interface Foo {
  add(num:number): this;
};

// 报错
type Foo = {
  add(num:number): this;
};

// type 可以扩展原始数据类型，interface 不行
// 正确
type MyStr = string & {
  type: 'new'
};

// 报错
interface MyStr extends string {
  type: 'new'
}

// interface无法表达某些复杂类型（比如交叉类型和联合类型），但是type可以
type A = { /* ... */ };
type B = { /* ... */ };

type AorB = A | B;
type AorBwithName = AorB & {
  name: string
};
```

#### class 类
- 造方法修改只读属性的值也是可以的。或者说，如果两个地方都设置了只读属性的值，以构造方法为准。在其他方法修改只读属性都会报错。
- 类可以实现多个接口（其实是接受多重限制），每个接口之间使用逗号分隔。
- TypeScript 不允许两个同名的类，但是如果一个类和一个接口同名，那么接口会被合并进类。
- TypeScript 的类本身就是一种类型，但是它代表该类的实例类型，而不是 `class` 的自身类型。
- 类的内部成员的外部可访问性，由三个可访问性修饰符控制：`public`（公开） 、 `private` （私有） 和 `protected` （保护）。
- 类的内部可以使用 `static` 关键字，定义静态成员。

```javascript
// strictPropertyInitialization 默认配置是打开的
// 就会检查属性是否设置了初值，如果没有就报错
class Point {
  x: number; // 报错
  y: number; // 报错
}
// 使用非空断言 可以不报错
class Point {
  x!: number;
  y!: number;
}

// 只读属性
class A {
  readonly id = 'foo';
}
const a = new A();
a.id = 'bar'; // 报错

// 构造方法支持修改只读属性值，以构造方法为准
class A {
  readonly id:string = 'foo';

  constructor() {
    this.id = 'bar'; // 正确
  }
}

// 参数默认值
class Point {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

// 存取器写法
class C {
  _name = '';
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
}

// 类使用 implements 关键字，表示当前类满足这些外部类型条件的限制。
interface Country {
  name:string;
  capital:string;
}
// 或者
type Country = {
  name:string;
  capital:string;
}

class MyCountry implements Country {
  name = '';
  capital = '';
}

// interface 只是指定检查条件，如果不满足这些条件就会报错。它并不能代替 class 自身的类型声明。
interface A {
  get(name:string): boolean;
}

class B implements A {
  get(s) { // s 的类型是 any  如需也是 string 类型 则要单独设置 s:string
    return true;
  }
}

// 实现多个接口
class Car implements MotorVehicle, Flyable, Swimmable {}

// 如果一个类和一个接口同名，那么接口会被合并进类。
class A {
  x:number = 1;
}

interface A {
  y:number;
}

let a = new A();
a.y = 10;

a.x // 1
a.y // 10

// 结构类型原则：只要Person类具有name属性，就满足Customer类型的实例结构，所以可以代替它。反过来就不行，如果Customer类多出一个属性，就会报错。
class Person {
  name: string;
}

class Customer {
  name: string;
  age: number;
}

// 报错
const cust:Customer = new Person();

// 类 继承
class A {
  greet() {
    console.log('Hello, world!');
  }
}
class B extends A {}
const b = new B();
b.greet() // "Hello, world!"
```