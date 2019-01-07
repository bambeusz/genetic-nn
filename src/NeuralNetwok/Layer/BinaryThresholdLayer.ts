import {Layer} from './Layer';
import {BinaryThreshold} from '../Neuron';

export class BinaryThresholdLayer extends Layer {
    public createNeurons(numberOfNeurons: number, biases?: number[]) {
        return Array.apply(null, {length: numberOfNeurons})
            .map((item: undefined, index: number) => new BinaryThreshold(this, biases && biases[index]));
    }

    public addNeuron() {
        this.neurons.push(new BinaryThreshold(this));
    }
}
