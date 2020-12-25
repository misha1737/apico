<template>
  <div class="min-content">
    <FilterPanel />
    <div class="catalog">
      <Tile v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FilterPanel from "@/components/FilterPanel.vue";
import Tile from "@/components/Tile.vue";
export default {
  name: "Home",
  data() {
    return {
      products: true,
    };
  },
  components: {
    FilterPanel,
    Tile,
  },
  async created() {
    await this.$store.dispatch("getProducts");
    this.products = this.$store.getters.products;
    this.$store.commit("searchOpen", true);
  },
  beforeDestroy() {
    this.$store.commit("searchOpen", false);
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>
<style lang="scss">
@import "./../scss/_catalog.scss";
</style>