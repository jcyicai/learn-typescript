// let a:unknown = 1
// let b:number = a

// let foo:unknown = (n = 0) => n + 1
// foo()

// let a:unknown = 10
// if(typeof a === 'number') {
//     console.log(a)
// }

// let obj:
//   { foo: string } &
//   { bar: string };

// obj = {
//   foo: 'hello',
//   bar: 'world'
// };

// console.log(typeof null)

// let num = 1;
// let b:typeof num;

// if (typeof num === 'number') {
//   b = num;
//   console.log(1)
// }

// const arr: readonly number[] = [1,2]
// arr[0] = 2

// function add(x:number, y:number) {
//     return x + y;
//   }

// console.log(typeof add)

// type MyArr = {
//   [n: number]: number
// }

// const arr: MyArr = {
//   1: 1,
// }

// interface MyObj {
//     a: boolean;      // 编译错误
//     [prop: string]: number;
// }

// interface Country {
//   name: string
//   capital: string
// }

// class MyCountry implements Country {
//   name = ''
//   capital = '' // number 类型则报错 需满足 Country
// }

// enum MyEnum {
//   One = 'One',
//   Two = 'Two',
// }

// function f(arg: MyEnum) {
//   return 'arg is ' + arg
// }

// f('One') // 报错
// f(MyEnum.One) // 正确

// type T = 'a'|'b'|'c';
// let fo = 'a';

// let bar:T = fo as T; // 类型断言