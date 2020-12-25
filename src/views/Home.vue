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

  components: {
    FilterPanel,
    Tile,
  },
  async created() {
    await this.$store.dispatch("getProducts");
    this.$store.commit("searchOpen", true);
  },
  beforeDestroy() {
    this.$store.commit("setSearchText", "");
    this.$store.commit("searchOpen", false);
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    minPrice() {
      return this.$store.getters.minPrice;
    },
    maxPrice() {
      return this.$store.getters.maxPrice;
    },
    searchText() {
      return this.$store.getters.searchText;
    },
    products() {
      const products = this.$store.getters.products;
      return products.filter((item) => {
        if (item.title.toUpperCase().indexOf(this.searchText.toUpperCase()))
          return false;
        return this.minPrice <= item.price && item.price <= this.maxPrice;
      });
    },
  },
};
</script>
<style lang="scss">
@import "./../scss/_catalog.scss";
</style>