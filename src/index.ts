import { SVG } from "@svgdotjs/svg.js";
import { Node } from "./svg/node";
import { NodeEdge } from "./svg/nodeEdge";
import { Shape, Coord } from "./svg/shape"

let draw = SVG()
let group = draw.group()

const svgSize: Coord = { x: 1000, y: 1000 }
const nodeRadius = 100

let shapes: Shape[] = []
const node1 = new Node({ radius: nodeRadius, center: { x: svgSize.x / 2, y: nodeRadius }, fill: "red" });
const node2 = new Node({ radius: nodeRadius, center: { x: nodeRadius, y: svgSize.y / 2 }, fill: "blue" });
const node3 = new Node({ radius: nodeRadius, center: { x: svgSize.x / 2, y: svgSize.y - nodeRadius }, fill: "green" });
const node4 = new Node({ radius: nodeRadius, center: { x: svgSize.x - nodeRadius, y: svgSize.y / 2 }, fill: "yellow" });

shapes.push(new NodeEdge({
	svgSize,
	startNode: node1,
	endNode: node2,
	parentThicknessCriteria: 100,
	startNodeThicknessCriteria: 100,
	endNodeThicknessCriteria: 50,
}))

shapes.push(new NodeEdge({
	svgSize,
	startNode: node1,
	endNode: node3,
	parentThicknessCriteria: 100,
	startNodeThicknessCriteria: 20,
	endNodeThicknessCriteria: 100,
}))

shapes.push(new NodeEdge({
	svgSize,
	startNode: node1,
	endNode: node4,
	parentThicknessCriteria: 100,
	startNodeThicknessCriteria: 60,
	endNodeThicknessCriteria: 20,
}))

shapes.push(new NodeEdge({
	svgSize,
	startNode: node2,
	endNode: node3,
	parentThicknessCriteria: 100,
	startNodeThicknessCriteria: 90,
	endNodeThicknessCriteria: 10,
}))

// shapes.push(new NodeEdge({
// 	svgSize,
// 	startNode: node2,
// 	endNode: node4,
// 	parentThicknessCriteria: 100,
// 	startNodeThicknessCriteria: 60,
// 	endNodeThicknessCriteria: 20,
// }))

shapes.push(new NodeEdge({
	svgSize,
	startNode: node3,
	endNode: node4,
	parentThicknessCriteria: 100,
	startNodeThicknessCriteria: 90,
	endNodeThicknessCriteria: 20,
}))

shapes.push(node1, node2, node3, node4)



shapes.forEach((s) => {
	s.draw(group)
})

draw.css({ overflow: "visible", margin: "10" })
draw.addTo('body').size(svgSize.x, svgSize.y)
