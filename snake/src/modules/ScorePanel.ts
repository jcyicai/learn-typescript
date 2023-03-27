// 定义记分牌的类
class ScorePanel {
	score = 0 // 记录分数 默认 0
	level = 1 // 记录等级 默认 1
	scoreEle: HTMLElement
	levelEle: HTMLElement

	// 设置最大level
	maxLevel: number
	// 设置升级多少分数 升一级
	upScore: number

	constructor(maxLevel: number = 10, upScore: number = 10) {
		this.maxLevel = maxLevel
		this.upScore = upScore
		this.scoreEle = document.getElementById('score')!
		this.levelEle = document.getElementById('level')!
	}

	// 加分方法
	addScore() {
		this.score++
		this.scoreEle.innerHTML = this.score + ''

		// 分数满10 升一级
		if (this.score % this.upScore === 0) {
			this.levelUp()
		}
	}

	// 提升等级方法
	levelUp() {
		if (this.level < this.maxLevel) {
			this.level++
			this.levelEle.innerHTML = this.level + ''
		}
	}
}

export default ScorePanel

/* const scorePanel = new ScorePanel()
scorePanel.addScore() */
