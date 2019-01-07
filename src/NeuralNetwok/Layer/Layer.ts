import { INeuron, Neuron } from '../Neuron';

export interface ILayer {
    neurons: INeuron[];
    number: number;

    activate: (inputs: number[], inputNumber: number) => number[];
    connect: (to: ILayer | INeuron, weight?: number) => void;
    createNeurons: (numberOfNeurons: number, other: any[]) => void;
    pushFurther: () => void;
    addNeuron: () => void;
}

export class Layer implements ILayer {
    public neurons: INeuron[];
    public number: number;

    constructor(numberOfNeurons: number, number: number, biases?: number[], ...other: any []) {
        this.number = number;
        this.neurons = this.createNeurons(numberOfNeurons, biases, ...other);
    }

    private static isLayer(target: ILayer | INeuron): target is ILayer {
        return target instanceof Layer;
    }

    private connectToNeuron(to: INeuron, weight?: number) {
        this.neurons.forEach((neuron: INeuron) => neuron.connect(to, weight));
    }

    public createNeurons(numberOfNeurons: number, biases?: number[], ...other: any[]) {
        return Array.apply(null, {length: numberOfNeurons})
            .map((item: undefined, index: number) => new Neuron(this, biases && biases[index]));
    }

    public addNeuron() {
        this.neurons.push(new Neuron(this));
    }

    public pushFurther() {
        this.number++;
        this.neurons.forEach((neuron: INeuron) => neuron.layer.number++);
    }

    public connect(to: ILayer | INeuron, weight?: number) {
        if (!Layer.isLayer(to)) {
            return this.connectToNeuron(to, weight);
        }

        to.neurons.forEach((neuron => this.connectToNeuron(neuron, weight)));
    }

    public activate(inputs: number[], inputNumber: number): number[] {
        return this.neurons.map((neuron: INeuron) => {
            return neuron.activate(inputs, inputNumber);
        });
    }
}
