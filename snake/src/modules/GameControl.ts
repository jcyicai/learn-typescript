import Food from './Food'
import Snake from './Snake'
import ScorePanel from './ScorePanel'

// 游戏控制器
class GameControl {
	// 蛇
	snake: Snake
	// 食物
	food: Food
	// 记分器
	scorePanel: ScorePanel
	// 创建一个属性存储蛇移动方向（按键方向）
	dircetion: string = ''
	// 游戏是否结束
	isLevel = true

	constructor() {
		this.snake = new Snake()
		this.food = new Food()
		this.scorePanel = new ScorePanel()

		this.init()
	}

	// 游戏初始方法
	init() {
		// 绑定 按下事件  绑定bind 是因为 调用 keydownHandler 时 this指向 丢失
		document.addEventListener('keydown', this.keydownHandler.bind(this))
		// run 蛇移动
		this.run()
	}

	/**
	 * ArrowDown 下
	 * ArrowUp 上
	 * ArrowLeft 左
	 * ArrowRight 右
	 */

	keydownHandler(event: KeyboardEvent) {
		this.dircetion = event.key
	}

	// 创建蛇移动方法
	run() {
		/**
		 * 根据 this.direction 来改变蛇位置
		 * 向上 top 减少
		 * 向下 top 增加
		 * 向左 left 减少
		 * 向右 left 增加
		 */

		let X = this.snake.X
		let Y = this.snake.Y

		switch (this.dircetion) {
			case 'ArrowUp':
			case 'Up':
				// 向上移动 top -10
				Y -= 10
				break
			case 'ArrowDown':
			case 'Down':
				// 向下移动 top +10
				Y += 10
				break
			case 'ArrowLeft':
			case 'Left':
				// 向左移动 top -10
				X -= 10
				break
			case 'ArrowRight':
			case 'Right':
				// 向右移动 top +10
				X += 10
				break
		}

		// 吃到食物
		this.checkEat(X, Y)

		// 捕获 snake.ts中 设置值 报错
		try {
			this.snake.X = X
			this.snake.Y = Y
		} catch (e: any) {
			alert(e.message + 'GAME OVER!')
			this.isLevel = false
		}

		if (this.isLevel) {
			setTimeout(() => {
				this.run()
			}, 300 - (this.scorePanel.level - 1) * 30)
		}
	}

	// 蛇是否吃到食物
	checkEat(X: number, Y: number) {
		if (this.food.X === X && this.food.Y === Y) {
			// 食物位置重置
			this.food.change()
			// 分数增加
			this.scorePanel.addScore()
			// 蛇增加
			this.snake.addBody()
		}
	}
}

export default GameControl
