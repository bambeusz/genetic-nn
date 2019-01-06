class Connection {
    public from: INeuron;
    public to: INeuron;
    public weight: number;

    constructor(from: INeuron, to: INeuron, weight: number) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
}

export default Connection;
