import { NeuralNetwork } from 'brain.js'
import { INeuralNetworkData } from 'brain.js/dist/neural-network'

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

export type DNA = NeuralNetwork<INeuralNetworkData, INeuralNetworkData>

export type Bot = {
  kind: BotKind
  place: Point
  energy: number
  vector: Point
  id: number
  clan: string
  dna: Array<Array<DNA>>
}

export type Bots = Set<Bot>

export type BotAction = {
  gMain: number
  gGreen: number
  gBlue: number
  gRed: number
  selfDestroy: number
}
