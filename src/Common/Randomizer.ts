const Randomizer: IRandomizer = class {
    static getRandomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
};

export default Randomizer;
