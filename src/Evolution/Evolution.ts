interface IEvolutionConfig {
    populationSize: number;
}

interface IEvolution {
    config: IEvolutionConfig;
}

class Evolution implements IEvolution {
    config: IEvolutionConfig;

    constructor(config: IEvolutionConfig) {
        this.config = config;
    }
}

export default Evolution;
