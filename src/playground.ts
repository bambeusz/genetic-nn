import { Network, Sigmoid, SigmoidLayer } from './NeuralNetwok';

const input = new SigmoidLayer(1, 0,  null, Sigmoid.TANH);
const output = new SigmoidLayer(1, 1, null, Sigmoid.TANH);

input.connect(output);

const network = new Network([input]);

console.log('INPUT:', input.neurons);
console.log('OUTPUT:', output.neurons);
console.log('CONNECTIONS: ', output.neurons[0].inputs);

console.log('RESULT:', network.activate([0]));