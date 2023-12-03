import { Container } from '@svgdotjs/svg.js'
import { Shape, Coord } from './shape'
import { Node } from './node'

export interface NodeEdgeConfig {
	parentThicknessCriteria: number
	startNodeThicknessCriteria: number
	endNodeThicknessCriteria: number
	startNode: Node
	endNode: Node
	svgSize: Coord
}

export class NodeEdge implements Shape {
	config: NodeEdgeConfig

	constructor(config: NodeEdgeConfig) {
		this.config = config
	}

	nodeCoord(node: Node, nodeThicknessCriteria: number): { left: Coord, right: Coord } {
		let left = {
			x: node.left.x,
			y: node.left.y,
		}
		let right = {
			x: node.right.x,
			y: node.right.y,
		}
		let diameter = node.config.radius * 2
		var ratio = nodeThicknessCriteria / this.config.parentThicknessCriteria
		let diff = (diameter - (diameter * ratio)) / 2
		left.x = left.x + diff
		right.x = right.x - diff
		return { left, right }
	}

	draw(container: Container): void {
		let c = this.config
		let startNodeCoord = this.nodeCoord(this.config.startNode, this.config.startNodeThicknessCriteria)
		let endNodeCoord = this.nodeCoord(this.config.endNode, this.config.endNodeThicknessCriteria)

		var linear = container.gradient('linear', (add) => {
			add.stop(0, this.config.startNode.config.fill)
			add.stop(1, this.config.endNode.config.fill)
		})
			.from(startNodeCoord.left.x / c.svgSize.x, startNodeCoord.left.y / c.svgSize.y)
			.to(endNodeCoord.left.x / c.svgSize.x, endNodeCoord.left.y / c.svgSize.y)

		container.path([
			["M", startNodeCoord.left.x, startNodeCoord.left.y],
			["L", endNodeCoord.left.x, endNodeCoord.left.y],
			["L", endNodeCoord.right.x, endNodeCoord.right.y],
			["L", startNodeCoord.right.x, startNodeCoord.right.y],
			["z"],
		])
			.fill(linear)
			.stroke({
				width: 3,
				color: "black"
			})
	}
}