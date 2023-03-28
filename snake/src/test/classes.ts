// abstract 抽象类 专门用来继承的类 不能创建对象
abstract class Animal {
	// private 私有属性
	private _name: string
	age: number
	protected color: string // 受保护的属性 只能在当前类或子类中使用
	// name: string = 'lucky' // 实例属性 通过对象实例访问
	// static age: number = 1 // 类属性 静态属性
	// 构造函数会在对象创建时调用
	constructor(name: string, age: number, color: string) {
		// this表示当前的实例
		console.log(this)
		this._name = name

		this.age = age
		this.color = color
	}

	// 私有属性 设置方法访问和设置
	/* getName() {
		return this._name
	}
	setName(name: string) {
		this._name = name
	} */

	get name() {
		// 获取 animal.name
		return this._name
	}
	set name(value: string) {
		// 设置 animal.name = 'dog'
		this._name = value
	}

	// 抽象方法
	// 没有方法体
	// 子类必须对该方法重写
	abstract sayHello(): void
}

class Dog extends Animal {
	color: string

	constructor(name: string, age: number, color: string) {
		// 子类中使用构造函数 必须在子类构造函数中调用父类
		super(name, age, color) // 必须传入 因为父类定义两个参数
		this.color = color
	}

	sayHello() {
		// super表示当前的父类
		//super.sayHello()
	}
}

const dog = new Dog('小黑', 3, '#000')
console.log(dog)

class A {
	constructor(public name: string) {}
}

// 等同于
class B {
	name: string
	constructor(name: string) {
		this.name = name
	}
}

const a = new A('cc')
