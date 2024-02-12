import { BOT_RADIUS } from '../model/const'
import { BotKind, Bots, Point } from '../types'
import './app.css'
import resetCanvas from './reset-canvas'

export default class WebView {
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

  public draw(atoms: Bots) {
    if (this.canDraw) {
      this.drawBots(atoms)
    }
  }

  private drawBots(bots: Bots) {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.viewSize.x, this.viewSize.y)
      bots.forEach((bot) => {
        let color = 'FFFFFF'

        switch (bot.kind) {
          case BotKind.Blue:
            color = '0000FF'
            break
          case BotKind.Green:
            color = '00FF00'
            break
          case BotKind.Red:
            color = 'FF0000'
            break
          case BotKind.Main:
            color = 'FFFFFF'
            break
          default:
            break
        }

        // Окружность цвета 1 заполненная цветом 2
        this.ctx!.beginPath()
        this.ctx!.strokeStyle = `#${color}`
        this.ctx!.arc(
          bot.place.x,
          bot.place.y,
          BOT_RADIUS,
          0,
          2 * Math.PI,
          false,
        )
        this.ctx!.fillStyle = `#${color}55`
        this.ctx!.stroke()
        this.ctx!.fill()
        this.ctx!.closePath()
      })
    }
  }
}