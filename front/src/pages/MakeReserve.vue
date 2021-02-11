<template>
  <q-page class="">
    <div class="">
     <q-input filled v-model="selectedDate" mask="date" :rules="['date']" v-on:change="handleDateChanged"> 
     <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date
              v-model="selectedDate"
              color="orange"
              :title= selectedDate
              subtitle="예약하실 날짜를 고르세요"
              @input="handleDateChanged"
              :options="weekOnly"
            />
        </q-popup-proxy>
      </q-icon>
      </template>
     </q-input>      
    </div>
    <div class="">
      <time-table v-bind:reservations="reservations">
      </time-table>
    </div>
  </q-page>
</template>
<script>

import CommonUtil from 'components/mixin/Utils'
import TimeTable from 'components/TimeTable'
import * as API from '../api/api';

export default {
	components: { TimeTable },
  mixins: [CommonUtil],
  data () {
    return {
      selectedDate: null,
      todayStr: this.getFormatDate(new Date()),
    }
  },
  computed:{
      maxDay: function(){
        let dd = new Date();
        dd.setDate(new Date().getDate()+7)
        dd.setHours(23)
        dd.setMinutes(59)
        dd.setSeconds(59)
        return dd;
      },
      reservations:{
        get(){
          return this.$store.state.reserve.reserves
        },
        set(val){
        }
      } 
  },
  
  methods: {
    handleDateChanged(val) {
        console.log("date was changed : "+val)
        this.selectedDate = val
        this.refreshReservation(val);
    },
    refreshReservation(selectedDate) {
      console.log('refreshReservation')
      this.$store.dispatch('reserve/setReservations',API.getReservations(selectedDate),{root:true})
    },
    weekOnly(date){
      if( date < this.todayStr )
        return false
      if( Date.parse(date) > this.maxDay ){
        return false
      }
      return true;
    }
  },

  mounted() {
    if( this.selectedDate == null ){
      this.handleDateChanged( this.getFormatDate(new Date()))
    }
  }
}
</script>
