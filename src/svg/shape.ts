import { Container } from "@svgdotjs/svg.js";

export interface Shape {
	draw(container: Container): void
}

export interface Coord {
	x: number
	y: number
}
