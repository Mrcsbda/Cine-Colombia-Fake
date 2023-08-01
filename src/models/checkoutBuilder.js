export class Checkout {
    constructor() {
        this.schedule = undefined;
        this.multiplex = undefined;
    }

    setSchedule(schedule) {
        this.schedule = schedule;
        return this;
    }

    setMultiplex(multiplex) {
        this.multiplex = multiplex;
        return this;
    }
}
