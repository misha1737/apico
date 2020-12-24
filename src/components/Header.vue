  
<template>
  <div class="header" :class="{ dark: user }">
    <div class="content">
      <router-link to="/">
        <img v-if="user" alt="logo" src="../assets/logo-light.svg" />
        <img v-else alt="logo" src="../assets/logo.svg" />
      </router-link>
      <div class="header__buttons">
        <router-link class="sell btn" to="/">Sell</router-link>
        <router-link class="logIn" to="/authentication">LogIn</router-link>
        <router-link class="logIn" to="/addProduct">add</router-link>
      </div>
    </div>
    <div class="min-content">
      <div v-if="user && search" class="search">
        <div class="byName">
          <img class="icon" alt="" src="../assets/search.svg" />
          <input type="text" placeholder="Search products by name" />
        </div>
        <div class="byLocation">
          <img class="icon" alt="" src="../assets/location.svg" />
          <input type="text" placeholder="Location" />
        </div>
        <div class="searchButton">Search</div>
      </div>
    </div>
    {{ search }}
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    user: Boolean,
  },
  computed: {
    search() {
      return this.$store.getters.search;
    },
  },
};
</script>  
<style lang="scss">
@import "./../scss/_header.scss";
</style>

