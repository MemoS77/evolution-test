import { NeuralNetwork } from 'brain.js'

function randomNet() {
  const config = {
    binaryThresh: 0.5,
    hiddenLayers: [
      2 + Math.floor(Math.random() * 20),
      2 + Math.floor(Math.random() * 10),
    ], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
    //inputSize: 4,
  }

  // create a simple feed-forward neural network with backpropagation
  const net = new NeuralNetwork(config)

  const trainData = []

  for (let i = 0; i < 10; i++) {
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

const output = randomNet().run([0, 1, 0, 1, 0, 0, 0, 0]) // [0.987]
console.log(output[0])
