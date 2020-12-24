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
  data() {
    return {
      user: true,
    };
  },
};
</script>
<style lang="scss">
@import "./scss/_base.scss";
</style>