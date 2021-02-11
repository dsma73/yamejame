<template>
   <q-dialog v-model="showReserveDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h4">내 예약 확인</div>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">예약하신 이름과 전화번호를 넣어주세요</div>
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
          <q-btn flat label= "확인" v-close-popup 
            @click="gotoCheckReserve"
            :disabled= "customerName.length < 2 || customerTel.length < 11"
          />
          <q-btn flat label="닫기" v-close-popup 
            @click="cancel"
          />          
        </q-card-actions>
      </q-card>
    </q-dialog>    
</template>
<script>
export default {
  data() {
    return {
      customerName:'',
      customerTel:'',
      showReserveDialog:true
    }
  },
  methods: {
    openDialog () {
      this.showReserveDialog = true
    },
    gotoCheckReserve(){
       this.showReserveDialog = false
       
    },
    cancel(){
      this.$router.replace('/')
    }
  }
}
</script>
