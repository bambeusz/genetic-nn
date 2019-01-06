// Evolution
interface IEvolutionConfig {
    populationSize: number;
}

interface IEvolution {
    config: IEvolutionConfig;
}

// Neural network
interface INeuron {
    bias: number;
}

// Common
interface IRandomizer {
    getRandomFloat(min: number, max: number): number;
}
