  
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
    <div v-if="user" class="like" @click="select(product.id)">
      <img v-if="isLiked" src="../assets/like_active.svg" alt="icon" />
      <img v-else src="../assets/like.svg" alt="icon" />
    </div>
    <h3 class="title">{{ product.title }}</h3>
    <p class="price">${{ product.price }}</p>
  </div>
</template>
<script>
export default {
  name: "Tile",
  data() {
    return {
      idLike: null,
    };
  },
  methods: {
    select(id) {
      this.isLiked
        ? this.$store.dispatch("delLike", id)
        : this.$store.dispatch("setLike", id);
    },
  },
  props: {
    product: Object,
  },
  computed: {
    isLiked() {
      const likes = this.$store.getters.getLikes;
      if (likes && this.product) {
        return Object.values(likes).find((element, index) => {
          if (element === this.product.id) {
            return true;
          } else {
            return false;
          }
        })
          ? true
          : false;
      }
      return false;
    },
    user() {
      return this.$store.getters.checkUser;
    },
  },
};
</script>  


