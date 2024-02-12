import { AtomMap, Point } from '../types'
import './app.css'
import resetCanvas from './reset-canvas'

const ATOM_DISPLAY_SIZE = 4

export default class View {
  private ctx: CanvasRenderingContext2D | null = null
  private canDraw: boolean = false
  constructor(private viewSize: Point) {
    if (resetCanvas(viewSize.x, viewSize.y)) {
      this.ctx = document
        .querySelector<HTMLCanvasElement>('canvas')!
        .getContext('2d')!
      this.canDraw = true
    }
  }

  public draw(atoms: AtomMap) {
    if (this.canDraw) {
      this.drawAtoms(atoms)
    }
  }

  private drawAtoms(atoms: AtomMap) {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.viewSize.x, this.viewSize.y)
      atoms.forEach((atoms, color) => {
        this.ctx!.fillStyle = color
        atoms.forEach((atom) => {
          this.ctx!.fillRect(
            atom.place.x,
            atom.place.y,
            ATOM_DISPLAY_SIZE,
            ATOM_DISPLAY_SIZE,
          )
        })
      })
    }
  }
}
