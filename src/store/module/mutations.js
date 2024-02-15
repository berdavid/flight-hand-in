export function originMutation (state, payload) {
  state.Origin = payload
  localStorage.setItem('Origin', payload)
}

export function destinationMutation (state, payload) {
  state.Destination = payload
  localStorage.setItem('Destination', payload)
}

export function departureDateMutation (state, payload) {
  state.DepartureDate = payload
  localStorage.setItem('DepartureDate', payload)
}

export function returnDateMutation (state, payload) {
  state.ReturnDate = payload
  localStorage.setItem('ReturnDate', payload)
}


