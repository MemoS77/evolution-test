import { NeuralNetwork } from 'brain.js'
import { DNA } from '../../types'
const mutationRate = 0.001

export function copyDna(net: DNA) {
  const js = net.toJSON()
  //console.log(js)
  js.layers.forEach((layer) => {
    layer.biases.forEach((b, id) => {
      if (Math.random() < mutationRate) {
        layer.biases[id] = Math.random() - 0.5
        //console.log('mutation')
        //console.log('old', layer.biases[id], 'new', layer.biases[id])
      }
    })
    /*
    layer.weights.forEach((w, id) => {
      w.forEach(() => {
        if (Math.random() < mutationRate) w[id] = Math.random() / 2 - 0.5
      })
    })*/
  })
  return new NeuralNetwork().fromJSON(js)
}
