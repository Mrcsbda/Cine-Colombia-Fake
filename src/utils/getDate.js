export const printDate = (schedule, type) => {
    switch (type) {
        case "day":
            const fecha = new Date(schedule);
            const opciones = { month: 'long', day: 'numeric', year: 'numeric' };
            const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
            return fechaFormateada
        case "hour":
            return `${new Date(schedule).getHours() < 10
                ? `0${new Date(schedule).getHours()}`
                : new Date(schedule).getHours()}:0${new Date(schedule).getMinutes()}`
        default: return ""
    }
}