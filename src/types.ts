import { NeuralNetwork } from 'brain.js'
import { INeuralNetworkData } from 'brain.js/dist/neural-network'

export enum BotKind {
  // Стволовая клетка.
  White,
  Green,
  Red,
  Blue,
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
  devideCounter: number
  dna: Array<DNA> | null
  // Данные вычислемые в каждом цикле. Для оптимизации вычислений, храним в боте.
  loopCalculated?: {
    neighbours: number
    emptySpace: number // на основе neighbours
    connectedBots: Bot[]
  }
}

export type Bots = Set<Bot>
