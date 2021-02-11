<template>
<div class="flex flex-center column q-gutter-xs">
  <div v-for="time in reservations" v-bind:key="time.time" class="row" style="width:100%;" >
      <q-btn :color="time.reserved ? 'grey':'teal'" class="col-4" @click="openReserveDialog(time)">
        <div>{{time.time}}</div>
      </q-btn>
      <div class="col-7" :class="time.reserved ? 'reservedSlot': 'freeSlot' " >
        {{getMaskedName(time)}}
      </div>
  </div>
    <q-dialog v-model="showReserveDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h4">{{this.cancelMode? '예약취소' : '예약하기'}}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">{{this.cancelMode? '예약하신 이름과 전화번호를 넣어주세요' : '예약하실 이름과 전화번호를 넣어주세요'}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input label="이름" 
          dense v-model="customerName" autofocus  
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input label="전화번호" dense v-model="customerTel"  
           mask="###-####-####"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat :label= "this.cancelMode ? '예약취소': '예약하기'" v-close-popup @click="makeReservation"
            :disabled= "customerName.length < 2 || customerTel.length < 11"
          />
          <q-btn flat label="닫기" v-close-popup />          
        </q-card-actions>
      </q-card>
    </q-dialog>
</div>
</template>
<script>
import CommonUtil from 'components/mixin/Utils'

export default {
  mixins: [CommonUtil],
  name: 'TimeTable',
   data () {
    return {
      showReserveDialog:false,
      customerName:'',
      customerTel:'',
      currentTime:{},
      cancelMode:false
    }
  },
  props: {
    reservations: {
       required:true,
       default: () =>[]
    }
  },
  methods: {
    openReserveDialog(reserveTime){
          this.customerName='';
          this.customerTel='';
          this.currentTime = reserveTime;

      if( !reserveTime.reserved ){
          this.cancelMode = false;
       }else{
          this.cancelMode = true;
        }
      this.showReserveDialog = true
    },
    findTodayReservation(customerName, customerTel){
        for( let time of this.reservations ){

          if(
//              time.customerName && 
              time.customerTel &&
//              time.customerName == customerName &&
              time.customerTel == customerTel
           )
           return time
        }
        return null
    },
    setReservation(time){
      let reserve = {}
      reserve.reserved = time.reserved
      reserve.customerName = time.customerTime
      reserve.customerTel = time.customerTel
      reserve.time = time.time
      this.$store.dispatch('reserve/setReservation',reserve)  
    },

    makeReservation(){
        if( this.cancelMode ){
            if( this.currentTime.customerName == this.customerName &&
              this.currentTime.customerTel == this.customerTel
            ){
              this.currentTime.reserved = false
              this.currentTime.customerName = null
              this.currentTime.customerTel = null
              this.setReservation(this.currentTime);

              this.$q.dialog({
                      title: '예약 취소',
                      message: '예약이 정상적으로 취소되었습니다'
                    })
            }
            else{
              this.$q.dialog({
                      title: '예약 취소 실패',
                      message: '예약자 정보가 일치하지 않습니다.'
                    })
            }
            return;    
        }

        let prevReservation = this.findTodayReservation( this.customerName,this.customerTel )
        if( prevReservation ){
          this.$q.dialog({
                  title: prevReservation.time +' 예약 수정',
                  message: '기존 예약을 취소하고 새로 예약하시겠어요?',
                  cancel: true,
                  persistent: true
                }).onOk(() => {
                  prevReservation.reserved = false
                  prevReservation.customerName = null
                  prevReservation.customerTel = null
                  this.setReservation(prevReservation)

                  this.currentTime.reserved = true;
                  this.currentTime.customerName = this.customerName;
                  this.currentTime.customerTel = this.customerTel;

                  this.$store.dispatch('reserve/setReservation',this.currentTIme)

                  this.$q.dialog({
                          title: '예약완료',
                          message: this.customerName+' 님, '+this.currentTime.time+'에 뵙겠습니다'
                        }).onOk(() => {
                          // console.log('OK')
                        }).onCancel(() => {
                          // console.log('Cancel')
                        }).onDismiss(() => {
                          // console.log('I am triggered on both OK and Cancel')
                        })     
                }
                ).onCancel(() => {
                  
                }).onDismiss(() => {
                  return
                })        
        }else{
          let reserve = {}
          reserve.reserved = true
          reserve.customerName = this.customerName
          reserve.customerTel = this.customerTel
          reserve.time = this.currentTime.time

          this.$store.dispatch('reserve/setReservation',reserve)       

          this.$q.dialog({
                  title: '예약완료',
                  message: this.customerName+' 님, '+this.currentTime.time+'에 뵙겠습니다'
                }).onOk(() => {
                  // console.log('OK')
                }).onCancel(() => {
                  // console.log('Cancel')
                }).onDismiss(() => {
                  // console.log('I am triggered on both OK and Cancel')
                })     
        }
      },
      getMaskedName(timeSlot){
        if( timeSlot.reserved ){
          return this.maskingPhoneNumber( timeSlot.customerTel )+ ' 예약 중'
        }else{
          return '예약가능'
        }
      }
  }
}
</script>

<style scoped>
    .reservedSlot {
        text-align:center;
        font-size:14px;
        background-color:darkgray;
        margin-left:2px;
        margin-right:2px;
    }
    .freeSlot {
       text-align:center;
       font-size:14px; 
       background-color:white;
        margin-left:2px;
        margin-right:2px;       
    }
</style>