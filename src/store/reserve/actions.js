export function setReservations ({commit}, payload) {
  commit('reserve/setReservations',payload,{root:true})
}

export function setReservation({commit}, payload){
  commit('reserve/setReservation',payload,{root:true})
}
