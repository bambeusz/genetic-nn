import Randomizer from '../Common/Randomizer';

class Neuron implements INeuron{
    public bias: number;

    constructor(bias?: number) {
        this.bias = bias || Randomizer.getRandomFloat(-1, 1);
    }
}

export default Neuron;
