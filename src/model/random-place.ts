import { Point } from '../types'

export default function randomPlace(fieldSize: Point, padding: number): Point {
  return {
    x: Math.random() * (fieldSize.x - padding * 2) + padding,
    y: Math.random() * (fieldSize.y - padding * 2) + padding,
  }
}
