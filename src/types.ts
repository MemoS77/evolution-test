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

export type BotAction = {
  gMain: number
  gGreen: number
  gBlue: number
  gRed: number
  selfDestroy: number
}
