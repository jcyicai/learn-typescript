// 接口中所有属性都不能有实际的值
// 接口所有方法都是抽象方法
interface myInter {
	name: string
	say(): void
}

// 类实现接口 implements
class MyInter implements myInter {
	name: string

	constructor(name: string) {
		this.name = name
	}

	say() {}
}
