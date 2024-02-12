import { BOT_COUNT } from './model/const'
import EvoGravityEngine from './model/evo-gravity-engine'
import { Point } from './types'
import WebView from './view/web-view'

const viewSize: Point = {
  x: Math.min(window.innerWidth - 20, 1200),
  y: Math.min(window.innerHeight - 20, 700),
}

export default function app() {
  const view = new WebView(viewSize)
  const engine = new EvoGravityEngine(viewSize, BOT_COUNT)
  engine.start()

  const draw = () => {
    view.draw(engine.bots)
    requestAnimationFrame(() => draw())
  }
  draw()
}
