<template>
  <div class="home">
    <div class="catalog">
        <div v-for="product in products" :key="product.id">
          <img :src="product.imageUrl" alt="">
          <h3>{{product.title}}</h3>
          <p>{{product.price}}</p>
        </div> 
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      products: true,
    };
  },
  components: {},
  async created() {
    await this.$store.dispatch('getProducts');
     this.products = this.$store.getters.products
   // this.$router.push("/authentication");
  },
   computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>
