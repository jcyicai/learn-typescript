// 食物 类
class Food {
	// 食物 元素
	element: HTMLElement

	constructor() {
		this.element = document.getElementById('food')!
	}

	// 获取食物 X 坐标
	get X() {
		return this.element.offsetLeft
	}

	// 获取食物 Y 坐标
	get Y() {
		return this.element.offsetTop
	}

	change() {
		// 生成一个随机数位置
		// 食物位置最小是 0 最大是 290
		// 蛇移动一次是一格，一格是 10
		// 先取 0 - 29 随机数，再四舍五入后 乘 10，得到 0 - 290之间的随机数且不包含 0 290
		let top = Math.round(Math.random() * 29) * 10
		let left = Math.round(Math.random() * 29) * 10

		this.element.style.left = left + 'px'
		this.element.style.top = top + 'px'
	}
}

export default Food
