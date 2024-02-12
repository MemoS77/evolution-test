import { Bots, Point } from '../types'

export default function setNewPlaces(atoms: Bots, borders: Point) {
  atoms.forEach((atom) => {
    atom.place.x += atom.vector.x
    atom.place.y += atom.vector.y

    if (atom.place.x < 0) {
      atom.place.x = 1
      atom.vector.x = -atom.vector.x
    } else if (atom.place.x > borders.x) {
      atom.place.x = borders.x - 1
      atom.vector.x = -atom.vector.x
    }

    if (atom.place.y < 0) {
      atom.place.y = 1
      atom.vector.y = -atom.vector.y
    } else if (atom.place.y > borders.y) {
      atom.place.y = borders.y - 1
      atom.vector.y = -atom.vector.y
    }
  })
}
