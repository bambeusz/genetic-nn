import * as shortid from 'shortid';
import { Randomizer } from '../../Common/Randomizer';
import { Connection, IConnection } from '../Connection';
import { ILayer } from '../Layer';

export type ActivationFunction = (value: number) => number;

export interface INeuron {
    ID: string;
    bias: number;
    layer: ILayer;
    inputs: IConnection[];

    activate: (inputs?: number[], inputNumber?: number) => number;
    connect: (to: INeuron | ILayer, weight?: number) => void;
    mutateBias: () => void;
    isConnected: (to: INeuron) => boolean;
    activationFunction: ActivationFunction;
    getInputsValue: (inputs?: number[], inputNumber?: number) => number;
}

// Implements simple linear neuron - does nothing on activation
export class Neuron implements INeuron {
    public ID: string;
    public bias: number;
    public layer: ILayer;

    public inputs: IConnection[];

    constructor(layer: ILayer, bias?: number) {
        this.ID = shortid.generate();
        this.bias = typeof bias === 'number' ? bias : Randomizer.getRandomFloat(-1, 1);
        this.layer = layer;
        this.inputs = [];
    }

    private static isNeuron(target: INeuron | ILayer): target is INeuron {
        return target instanceof Neuron;
    }

    private connectToNeuron(to: INeuron, weight?: number): void {
        if (to.layer.number <= this.layer.number) {
            throw new Error(`Can\'t connect neuron from layer ${this.layer.number} to neuron on layer ${to.layer.number}`);
        }

        to.inputs.push(new Connection(this, to, weight));
    }

    public activate(inputs?: number[], inputNumber?: number) {
        if (inputNumber === this.layer.number) {
            const neuronIndex = this.layer.neurons.findIndex((neuron: INeuron) => neuron.ID === this.ID);
            return this.activationFunction(this.bias + inputs[neuronIndex]);
        }

        const value = this.bias + this.getInputsValue(inputs, inputNumber);
        return this.activationFunction(value);
    }

    public activationFunction(value: number): number {
        return value;
    }

    public getInputsValue(inputs?: number[], inputNumber?: number): number {
        return this.inputs.reduce((acu: number, inputConnection: IConnection) => {
            return acu + (inputConnection.from.activate(inputs, inputNumber) * inputConnection.weight);
        }, 0);
    }

    public connect(to: INeuron | ILayer, weight?: number): void {
        if (Neuron.isNeuron(to)) {
            return this.connectToNeuron(to, weight);
        }

        to.neurons.forEach((neuron: INeuron) => this.connectToNeuron(neuron, weight));
    }

    public isConnected(to: INeuron): boolean {
        return this.inputs.findIndex((connection: IConnection) => connection.to.ID === to.ID) !== -1;
    }

    public mutateBias() {
        const rand = Randomizer.getRandomFloat();
        if (rand < .1) {
            return this.bias = Randomizer.getRandomFloat();
        }

        this.bias = Randomizer.getRandomFloat(this.bias * .95, this.bias * 1.05);
    }
}
