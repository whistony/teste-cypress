class codReserva{

    elements = {
        numeroReserva = cy.get('input[id="inputReservationNumber"]')

    }

    typeCodReserva(reserva){
        this.elements.numeroReserva().type(reserva)
    }

}

module.exports = new codReserva();