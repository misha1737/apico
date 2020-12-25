<template>
  <div id="app">
    <Header :user="user" />
    <router-view />
  </div>
</template>
<script>
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  },
  computed:{
    user(){
      return this.$store.getters.checkUser; 
    }
  }
};
</script>
<style lang="scss">
@import "./scss/_base.scss";
</style>