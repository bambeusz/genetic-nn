import {Layer} from './Layer';
import {Sigmoid, SigmoidSquashType} from '../Neuron';

export class SigmoidLayer extends Layer {
    squash: SigmoidSquashType;

    constructor(numberOfNeurons: number, number: number, biases?: number[], squash?: SigmoidSquashType) {
        super(numberOfNeurons, number, biases, squash);
        this.squash = squash;
    }

    public createNeurons(numberOfNeurons: number, biases?: number[], ...other: any[]) {
        return Array.apply(null, {length: numberOfNeurons})
            .map((item: undefined, index: number) => new Sigmoid(this, biases && biases[index], other[0] as SigmoidSquashType));
    }

    public addNeuron(bias?: number) {
        this.neurons.push(new Sigmoid(this, bias, this.squash));
    }
}
