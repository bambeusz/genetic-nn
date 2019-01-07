import {BinaryThresholdLayer, ILayer, Layer, SigmoidLayer} from './Layer';
import { INeuron } from './Neuron';
import { Randomizer } from '../Common/Randomizer';
import { IConnection } from './Connection';

export interface INetwork {
    layers: ILayer[];

    getAllNeurons: () => INeuron[];
    getAllConnections: () => IConnection[];
    addConnection: (i: number) => void;
    addNeuron: () => void;
    addLayer: (layer: ILayer) => void;
    mutate: () => void;
}

export class Network implements INetwork {
    layers: ILayer[];

    constructor(layers: ILayer[]) {
        this.layers = layers.sort((layerA: ILayer, layerB: ILayer) => layerA.number - layerB.number);
    }

    public static badConnection(from: INeuron, to: INeuron) {
        return from.layer >= to.layer || from.layer === to.layer || from.isConnected(to);
    }

    public static getRandomLayer(neurons: number, number: number): Layer | SigmoidLayer | BinaryThresholdLayer {
        const rand = Randomizer.getRandomInt(1, 3);
        switch (rand) {
            case 1:
                return new Layer(neurons, number);
            case 2:
                return new SigmoidLayer(neurons, number);
            case 3:
                return new BinaryThresholdLayer(neurons, number);
        }
    }

    public getAllNeurons(): INeuron[] {
        return this.layers.reduce((acu: INeuron[], layer: ILayer) => ([
            ...acu,
            ...layer.neurons,
        ]), []);
    }

    public getAllConnections(): IConnection[] {
        return this.getAllNeurons().reduce((acu: IConnection[], neuron: INeuron) => ([
            ...acu,
            ...neuron.inputs,
        ]), []);
    }

    public addConnection(i: number = 0): void {
        if (i > 10) {
            return;
        }

        const neurons = this.getAllNeurons();
        const A = Randomizer.getRandomItem(neurons);
        const B = Randomizer.getRandomItem(neurons);
        if (Network.badConnection(A, B)) {
            return this.addConnection(i + 1)
        }

        A.connect(B);
    }

    public addNeuron(): void {
        const connection = Randomizer.getRandomItem(this.getAllConnections());
        const layer = connection.from.layer.number + Math.round((connection.to.layer.number - connection.from.layer.number) / 2);
        if (layer !== connection.to.layer.number) {
            return this.layers.find((l: ILayer) => l.number === layer).addNeuron();
        }

        this.layers
            .filter((layer: ILayer) => layer.number >= connection.to.layer.number)
            .forEach((layer: ILayer) => layer.pushFurther());
        this.addLayer(Network.getRandomLayer(1, layer));
    }

    public addLayer(layer: ILayer): void {
        this.layers.push(layer);
        this.layers = this.layers.sort((layerA: ILayer, layerB: ILayer) => layerA.number - layerB.number);
    }

    public mutate(): void {
        const rand = Randomizer.getRandomFloat();
        if (rand < .9) {
            this.getAllNeurons().forEach((neuron: INeuron) => neuron.mutateBias());
        }
        if (rand < .6) {
            this.getAllConnections().forEach((connection: IConnection) => connection.mutateWeight());
        }
        if (rand < .4) {
            this.addConnection();
        }
        if (rand < .2) {
            this.addNeuron();
        }
    }

    public activate(input: number[]): number[] {
        const numbers = this.layers.map((layer: ILayer) => layer.number);
        const outputLayerNumber = Math.max(...numbers);
        const inputLayerNumber = Math.min(...numbers);
        const output = this.layers.find((layer: ILayer) => layer.number === outputLayerNumber);
        return output.activate(input, inputLayerNumber);
    }
}
