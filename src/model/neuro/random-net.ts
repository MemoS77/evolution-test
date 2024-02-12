import { NeuralNetwork } from 'brain.js'
import { DNA } from '../../types'

export default function randomNet(): DNA {
  const config = {
    binaryThresh: 0.5,
    hiddenLayers: [
      3 + Math.floor(Math.random() * 20),
      2 + Math.floor(Math.random() * 10),
    ], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
    //inputSize: 4,
  }

  // create a simple feed-forward neural network with backpropagation
  const net = new NeuralNetwork(config)

  const trainData = []

  for (let i = 0; i < 3; i++) {
    trainData.push({
      input: [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
      ],
      output: [Math.random()],
    })
  }

  net.train(trainData)
  return net
}
