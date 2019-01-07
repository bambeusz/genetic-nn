export class Randomizer {
    static getRandomFloat(min: number = 0, max: number = 1): number {
        return Math.random() * (max - min) + min;
    }

    static getRandomInt(min: number = 0, max: number = 1): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomItem<T>(collection: T[]): T {
        return collection[Randomizer.getRandomInt(0, collection.length - 1)];
    }
}
