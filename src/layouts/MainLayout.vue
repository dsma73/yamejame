<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Capang
        </q-toolbar-title>
<!--        <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          @click="gotoMain()"
          class="text-blue-8">
        Home
        </q-item-label>
        <q-item-label
          header
          class="text-grey-8"
          @click="gotoMakeReserve"
        >
        예약하기
        </q-item-label>        
        <q-item-label
          header
          class="text-grey-8"
          @click="checkReserve"
        >
        내 예약확인
        </q-item-label>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
/*
import EssentialLink from 'components/EssentialLink.vue'
const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
] */

export default {
  name: 'MainLayout',
  // components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods:{
    gotoMain(){
      this.$router.replace('/')
    },
    gotoMakeReserve(){
      this.$router.replace('/makeReserve')
    },
    checkReserve(){
      this.$router.push('/findReserve')
    }
  }
}
</script>
