export class Checkout {
    constructor() {
        this.checkoutProps = {}
    }

    setSchedule(schedule) {
        this.checkoutProps.schedule = schedule;
        return this;
    }

    setMultiplex(multiplex) {
        this.checkoutProps.multiplex = multiplex;
        return this;
    }
}
