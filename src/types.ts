export enum BotKind {
  // Стволовая клетка.
  Main,
  Green,
  Blue,
  Red,
}

export type Point = {
  x: number
  y: number
}

type DNA = {}

export type Bot = {
  kind: BotKind
  place: Point
  energy: number
  vector: Point
  id: number
  clan: string
  dna: DNA
}

export type Bots = Set<Bot>
