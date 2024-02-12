export type Point = {
  x: number
  y: number
}

export type Atom = {
  place: Point
  mass: number
  vector: Point
}

export type AtomMap = Map<string, Atom[]>
