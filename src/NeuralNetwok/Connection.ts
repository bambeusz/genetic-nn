import { Randomizer } from '../Common/Randomizer';
import { INeuron } from './Neuron';

export interface IConnection {
    from: INeuron;
    to: INeuron;
    weight: number;

    mutateWeight: () => void;
}

export class Connection implements IConnection {
    public from: INeuron;
    public to: INeuron;
    public weight: number;

    constructor(from: INeuron, to: INeuron, weight?: number) {
        this.from = from;
        this.to = to;
        this.weight = weight || Randomizer.getRandomFloat(-1, 1);
    }

    mutateWeight() {
        const rand = Randomizer.getRandomFloat(0, 1);
        if (rand < .1) {
            return this.weight = Randomizer.getRandomFloat(-1, 1);
        }

        this.weight = Randomizer.getRandomFloat(this.weight * 0.95, this.weight * 1.05);
    }
}
