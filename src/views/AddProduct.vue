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
  },
   computed: {

  },
};
</script>
