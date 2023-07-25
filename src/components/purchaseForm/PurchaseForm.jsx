import React from 'react'

const PurchaseForm = () => {
  return (
    <div>
      <h2>Información Personal</h2>
      <p>Completa los datos del formulario para realizar el pago</p>
      <form>
        <label>
          Correo Electronico
          <input type="email" />
        </label>
      </form>
    </div>
  )
}

export default PurchaseForm