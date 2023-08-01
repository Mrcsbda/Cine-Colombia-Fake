export class Checkout {
    constructor() {
        this.cinemaShowId = undefined;
        this.schedule = undefined;
        this.multiplex = undefined;
    }

    setCinemaShowId(cinemaShowId) {
        this.cinemaShowId = cinemaShowId;
        return this;
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
