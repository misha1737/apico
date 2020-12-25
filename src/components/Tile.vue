  
<template>
  <div class="tile">
    <div class="photoBlock">
      <img
        class="productPhoto"
        v-if="product.imageUrl"
        :src="product.imageUrl"
        alt=""
      />
      <img src="../assets/mask.jpg" alt="product" />
    </div>
    <div class="like">
      <img src="../assets/like.svg" alt="icon" />
    </div>
    <h3 class="title">{{ product.title }}</h3>
    <p class="price">${{ product.price }}</p>
  </div>
</template>
<script>
export default {
  name: "Tile",
  data() {
    return {};
  },
  methods: {},
  props: {
    product: Object,
  },
  computed: {},
};
</script>  


