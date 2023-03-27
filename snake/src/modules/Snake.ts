class Snake {
	// 蛇头
	head: HTMLElement
	// 蛇身（包括蛇头）  HTMLCollection 会实时刷新 增加新元素
	bodies: HTMLCollection
	// 蛇容器
	element: HTMLElement

	constructor() {
		this.element = document.getElementById('snake')!
		this.head = document.querySelector('#snake > div') as HTMLElement
		this.bodies = this.element.getElementsByTagName('div')
	}

	// 获取蛇头 X 坐标
	get X() {
		return this.head.offsetLeft
	}

	// 获取蛇头 Y 坐标
	get Y() {
		return this.head.offsetTop
	}

	// 设置蛇头 X 坐标
	set X(value: number) {
		// 新值等于旧值 直接 return
		if (this.X === value) {
			return
		}
		// 值范围 0 - 290
		if (value < 0 || value > 290) {
			throw new Error('蛇撞墙了！')
		}

		// 修改x时，是在修改水平坐标，蛇左右移动，蛇在左移动时，不能向右移动，反之必然
		if (
			this.bodies[1] &&
			(this.bodies[1] as HTMLElement).offsetLeft === value
		) {
			// 如果发生掉头，让蛇向反方向继续移动
			if (value > this.X) {
				// 如果新值value 大于旧值X，则说明在向右走，此时掉头，应该使蛇继续向左走
				value = this.X - 10
			} else {
				// 向左走
				value = this.X + 10
			}
		}

		// 移动身体
		this.moveBody()

		this.head.style.left = value + 'px'

		this.checkHeadBody() // 检查是否撞到自己
	}

	// 设置蛇头 Y 坐标
	set Y(value: number) {
		if (this.Y === value) {
			return
		}
		// 值范围 0 - 290
		if (value < 0 || value > 290) {
			throw new Error('蛇撞墙了！')
		}

		// 修改y时，是在修改垂直坐标，蛇上下移动，蛇在上移动时，不能向下移动，反之必然
		if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
			// 如果发生掉头，让蛇向反方向继续移动
			if (value > this.Y) {
				// 如果新值value 大于旧值Y，则说明在向上走，此时掉头，应该使蛇继续向下走
				value = this.Y - 10
			} else {
				// 向下走
				value = this.Y + 10
			}
		}

		// 移动身体
		this.moveBody()

		this.head.style.top = value + 'px'

		this.checkHeadBody() // 检查是否撞到自己
	}

	// 增加蛇身
	addBody() {
		this.element.insertAdjacentHTML('beforeend', '<div></div>')
	}

	// 身体移动
	// 蛇身位置 从后往前替换  1 2 3 4  1移动2前进到1的位置，依此类推。如果从前往后替换，值已经修改了，导致错误
	moveBody() {
		/**
		 * 将后面的位置替换前面的位置
		 * 例：
		 * 第4节 = 第3节的位置
		 * 第3节 = 第2节的位置
		 * 第2节= 第1节即蛇头的位置
		 */
		for (let i = this.bodies.length - 1; i > 0; i--) {
			// 获取前边身体位置
			let X = (this.bodies[i - 1] as HTMLElement).offsetLeft
			let Y = (this.bodies[i - 1] as HTMLElement).offsetTop

			// 将值设置当前位置上
			;(this.bodies[i] as HTMLElement).style.left = X + 'px'
			;(this.bodies[i] as HTMLElement).style.top = Y + 'px'
		}
	}

	checkHeadBody() {
		// 获取所有身体 检查是否和蛇头坐标重叠
		for (let i = 1; i < this.bodies.length; i++) {
			let bd = this.bodies[i] as HTMLElement
			if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
				// 蛇头和身体重叠，游戏结束
				throw new Error('撞到自己了！')
			}
		}
	}
}

export default Snake
