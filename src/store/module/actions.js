export function saveSearchParams (context, payload) {
  context.commit('originMutation', payload.origin)
  context.commit('destinationMutation', payload.destination)
  context.commit('departureDateMutation', payload.departure)
  context.commit('returnDateMutation', payload.return)
}

