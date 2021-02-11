<template>
  <q-page class="flex flex-center">
  <div class="q-pa-md">
      <q-btn color="black" class="full-width" label="예약하기" @click='gotoReserve'>
          <q-tooltip content-class="bg-accent">예약하기</q-tooltip>
        </q-btn>
      <q-btn color="orange" class="full-width" label="예약확인" @click="checkReserve">
          <q-tooltip content-class="bg-accent">예약확인</q-tooltip>
        </q-btn>
    </div>
    
 
  </q-page>
</template>
<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      customerName:'',
      customerTel:'',
      showReserveDialog:false
    }
  },
  methods: {
    gotoReserve () {
      this.$router.push('/makeReserve')
    },
    checkReserve () {
      this.$router.push('/findReserve')
    },
    gotoCheckReserve(){

    }
  }
}
</script>
