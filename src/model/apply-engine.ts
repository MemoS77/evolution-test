import { Bot, Bots } from '../types'
import {
  BOT_RADIUS,
  CORE_ANTIGRAVITY,
  CORE_DISTANCE_MULTIPLE,
  EMTY_SPACE_DECREASE,
  GRAVITY,
  MAX_GRAVITY_DISTANCE,
  MIN_GRAVITY_DISTANCE,
} from './const'
import proccessDna from './proccess-dna'

/*
function calcFreeSpace(bots: Bots, bot: Bot, d: number) {
  let freeSpace = 1
  let d = 0.15
  // 1 - непсоредственно вокруг клетки все пространстов свободно 0-клетка окружена с 6 сторон
  bots.forEach((b) => {
    if (b !== bot) {
      const dx = b.place.x - bot.place.x
      const dy = b.place.y - bot.place.y
      const d = Math.max(Math.sqrt(dx * dx + dy * dy))      
    }
  })
  return freeSpace
}*/

export default function applyEngine(bots: Bots) {
  // Gravity
  bots.forEach((atom1) => {
    // Сколько вокруг клетки - других. Два прохода для избежания лишних расчетов
    const distances = new Map<Bot, number[]>()
    let nearCount = 0

    for (let i = 0; i <= 2; i++) {
      bots.forEach((atom2) => {
        if (atom2 !== atom1) {
          if (i === 0) {
            // На первом круге вычислем соседей клетки, свободное место
            const dx = atom1.place.x - atom2.place.x
            const dy = atom1.place.y - atom2.place.y
            const d = Math.max(
              Math.sqrt(dx * dx + dy * dy),
              MIN_GRAVITY_DISTANCE,
            )
            distances.set(atom2, [d, dx, dy])
            if (d <= BOT_RADIUS * 2) {
              nearCount++
            }
          } else if (i === 2) {
            // На третьем применяем действия движка
          } else {
            // втором вычисляем новые ускорения по днк
            const [d, dx, dy] = distances.get(atom2)!

            // Количество света. При 5 соседях - очень мало. При 6 - 0.
            const lightCount = Math.max(1 - EMTY_SPACE_DECREASE * nearCount, 0)

            if (d <= MAX_GRAVITY_DISTANCE) {
              if (d > BOT_RADIUS * CORE_DISTANCE_MULTIPLE) {
                if (d <= BOT_RADIUS * 2) {
                  // Collision
                  const newVX = (atom1.vector.x + atom2.vector.x) / 2
                  const newVY = (atom1.vector.y + atom2.vector.y) / 2
                  atom1.vector = {
                    x: newVX,
                    y: newVY,
                  }
                  atom2.vector = {
                    x: newVX,
                    y: newVY,
                  }
                }
                const g =
                  GRAVITY *
                  (proccessDna(
                    atom1,
                    atom2,
                    d / MAX_GRAVITY_DISTANCE,
                    lightCount,
                  ) -
                    0.5)
                const F = g / d // With standart gravity function (d * d)  - model is not interesting
                const ax = (F * dx) / d
                const ay = (F * dy) / d
                atom2.vector.x -= ax
                atom2.vector.y -= ay
              } else {
                // Ссила отталкивания при очень близком сближении ядер
                atom2.vector.x -= (dx * CORE_ANTIGRAVITY) / (d * d)
                atom2.vector.y -= (dy * CORE_ANTIGRAVITY) / (d * d)
              }
            }
          }
        }
      })
    }
  })
}

/*
                const newVX = (atom1.vector.x + atom2.vector.x) / 2
                const newVY = (atom1.vector.y + atom2.vector.y) / 2
                atom1.vector = {
                  x: newVX,
                  y: newVY,
                }
                atom2.vector = {
                  x: newVX,
                  y: newVY,
                }
*/
