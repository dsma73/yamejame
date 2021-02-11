
import Vue from 'vue'

export function setReservations (state,payload) {
  console.log('set whole reservations')
  Vue.set(state, 'reserves', payload)
}

export function setReservation (state, payload) {
  console.log('set Single Reserve')

  for( const [index,r] of state.reserves.entries() ){
    if( r.time == payload.time){
      Vue.set( state.reserves[index] = payload)
      return
    }
  }
  console.log("can't find "+payload)
}


