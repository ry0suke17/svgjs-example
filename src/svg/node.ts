import { Container } from '@svgdotjs/svg.js'
import { Shape, Coord } from './shape'

export interface NodeConfig {
	radius: number
	center: Coord
	fill: string
}

export class Node implements Shape {
	private _config: NodeConfig

	private _left: Coord
	private _right: Coord

	get config() {
		return this._config
	}

	get left() {
		return this._left
	}

	get right() {
		return this._right
	}

	constructor(config: NodeConfig) {
		this._config = config

		this._left = {
			x: config.center.x - config.radius,
			y: config.center.y,
		}
		this._right = {
			x: config.center.x + config.radius,
			y: config.center.y,
		}

	}

	draw(container: Container): void {
		let c = this.config
		container.circle()
			.radius(c.radius)
			.center(c.center.x, c.center.y)
			.fill(c.fill)
			.stroke({
				width: 3,
				color: "black"
			})
	}
}