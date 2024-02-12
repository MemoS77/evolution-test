import { Bots, Point } from '../types'
import { BOT_RADIUS } from './const'

export default function setNewPlaces(atoms: Bots, borders: Point) {
  atoms.forEach((atom) => {
    atom.place.x += atom.vector.x
    atom.place.y += atom.vector.y

    if (atom.place.x < BOT_RADIUS) {
      atom.place.x = BOT_RADIUS
      atom.vector.x = -atom.vector.x
    } else if (atom.place.x > borders.x - BOT_RADIUS) {
      atom.place.x = borders.x - BOT_RADIUS
      atom.vector.x = -atom.vector.x
    }

    if (atom.place.y < BOT_RADIUS) {
      atom.place.y = BOT_RADIUS
      atom.vector.y = -atom.vector.y
    } else if (atom.place.y > borders.y - BOT_RADIUS) {
      atom.place.y = borders.y - BOT_RADIUS
      atom.vector.y = -atom.vector.y
    }
  })
}
