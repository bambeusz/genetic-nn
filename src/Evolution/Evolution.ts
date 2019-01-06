class Evolution implements IEvolution {
    config: IEvolutionConfig;

    constructor(config: IEvolutionConfig) {
        this.config = config;
    }
}

export default Evolution;
