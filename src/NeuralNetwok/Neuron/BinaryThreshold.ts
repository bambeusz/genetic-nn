import { Neuron, INeuron } from './Neuron';
import { BinaryThresholdLayer } from '../Layer';

export interface IBinaryThreshold extends INeuron {
    threshold: number;
}

export class BinaryThreshold extends Neuron implements IBinaryThreshold {
    public threshold: number;

    constructor(layer: BinaryThresholdLayer, bias?: number, threshold?: number) {
        super(layer, bias);
        this.threshold = threshold || 0;
    }

    public activationFunction(value: number): number {
        if (value > this.threshold) {
            return 1;
        }

        return 0;
    }
}
