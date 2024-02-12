import { NeuralNetwork } from 'brain.js'

const config = {
  binaryThresh: 0.5,
  hiddenLayers: [10, 10], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
  //inputSize: 4,
}

// create a simple feed-forward neural network with backpropagation
const net = new NeuralNetwork(config)

net.train([
  { input: [1, 0, 0, 0], output: [0] },
  { input: [0, 0, 0, 1], output: [0] },
  { input: [0, 1, 0, 0.2], output: [0] },
  { input: [1, 0, 1, 1], output: [1] },
  { input: [1, 0, 1, 1], output: [0] },
])

const output = net.run([0, 1, 0, 1]) // [0.987]

console.log(output, net.toJSON())
