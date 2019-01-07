import { Neuron } from './Neuron';
import { SigmoidLayer } from '../Layer';

export type SIGMOID_SQUASH_TANH = 'SIGMOID_SQUASH_TANH';
export type SIGMOID_SQUASH_LOGISTIC = 'SIGMOID_SQUASH_LOGISTIC';

export type SigmoidSquashType = SIGMOID_SQUASH_TANH | SIGMOID_SQUASH_LOGISTIC;

export interface ISigmoid {
    squash: SigmoidSquashType;
}

export class Sigmoid extends Neuron implements ISigmoid {
    public squash: SigmoidSquashType;

    public static TANH: SIGMOID_SQUASH_TANH = "SIGMOID_SQUASH_TANH";
    public static LOGISTIC: SIGMOID_SQUASH_LOGISTIC = "SIGMOID_SQUASH_LOGISTIC";

    constructor(layer: SigmoidLayer, bias?: number, squash?: SigmoidSquashType) {
        super(layer, bias);
        this.squash = squash || Sigmoid.LOGISTIC;
    }

    public static logistic(value: number): number {
        return 1 / (1 + Math.exp(-value));
    }

    public static tanh(value: number): number {
        return Math.tanh(value);
    }

    public activationFunction(value: number): number {
        switch (this.squash) {
            case Sigmoid.TANH:
                return Sigmoid.tanh(value);
            default:
                return Sigmoid.logistic(value);
        }
    }
}
