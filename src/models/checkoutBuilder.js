export class Checkout {
    constructor() {
        this.cinemaShowId = undefined;
        this.hall = undefined;
        this.schedule = undefined;
        this.multiplex = undefined;
        this.totalToPay = 0;
        this.totalTickets = {
            kids: 0,
            adults: 0,
            thirdAge: 0
        }
        this.places = [];
    }

    setCinemaShowId(cinemaShowId) {
        this.cinemaShowId = cinemaShowId;
        return this;
    }

    setHall(hall) {
        this.hall = hall;
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

    setTotalToPay(type, increment) {
        if (increment) {
            switch (type) {
                case "kids":
                    this.totalToPay = this.totalToPay + 12900;
                    return this;
                case "adults":
                    this.totalToPay = this.totalToPay + 14900;
                    return this;
                case "thirdAge":
                    this.totalToPay = this.totalToPay + 12900;
                    return this;
                default: return this;
            }
        } else {
            switch (type) {
                case "kids":
                    this.totalToPay = this.totalToPay - 12900;
                    return this;
                case "adults":
                    this.totalToPay = this.totalToPay - 14900;
                    return this;
                case "thirdAge":
                    this.totalToPay = this.totalToPay - 12900;
                    return this;
                case "reset":
                    this.totalToPay = 0;
                    return this;
                default: return this;
            }
        }
    }

    setTotalTickets(type, increment) {
        if (increment) {
            switch (type) {
                case "kids":
                    this.totalTickets.kids = this.totalTickets.kids + 1;
                    return this;
                case "adults":
                    this.totalTickets.adults = this.totalTickets.adults + 1;
                    return this;
                case "thirdAge":
                    this.totalTickets.thirdAge = this.totalTickets.thirdAge + 1;
                    return this;
                default: return this;
            }
        } else {
            switch (type) {
                case "kids":
                    this.totalTickets.kids = this.totalTickets.kids - 1;
                    return this;
                case "adults":
                    this.totalTickets.adults = this.totalTickets.adults - 1;
                    return this;
                case "thirdAge":
                    this.totalTickets.thirdAge = this.totalTickets.thirdAge - 1;
                    return this;
                case "reset":
                    this.totalTickets = {
                        kids: 0,
                        adults: 0,
                        thirdAge: 0
                    }
                    return this;
                default: return this;
            }
        }
    }

    setPlaces(place, add) {

        switch (add) {
            case "add":
                this.places.push(place)
                this.places = Array.from(new Set(this.places))
                return this;
            case "delete":
                const index = this.places.findIndex(item => item === place)
                this.places.splice(index, 1)
                return this
            case "reset":
                this.places = place;
                return this
            default: return this;
        }
    }
}
