  
<template>
  <div class="filterPanel">
    <div class="select" @click="isSelectOpen = !isSelectOpen">
      <img class="grid" src="../assets/grid.svg" alt="" />
      <div class="selected">{{ selected }}</div>
      <img
        class="chevron"
        :class="{ active: isSelectOpen }"
        src="../assets/chevron.svg"
        alt=""
      />
      <ul class="list" v-if="isSelectOpen">
        <li
          @click="select(category)"
          v-for="category in categories"
          :key="category"
        >
          <span>{{ category }}</span>
        </li>
      </ul>
    </div>
    <input v-model.number='minPrice' type="text" placeholder="Price from (USD)" />
    <img class="line" src="../assets/line.svg" alt="" />
    <input v-model.number='maxPrice' type="text" placeholder="Price to (USD)" />
  </div>
</template>
<script>
export default {
  name: "FilterPanel",
  data() {
    return {
      categories: [
        "category1",
        "category2",
        "category3",
        "category4",
        "category5",
      ],
      selected: "Choose Category",
      isSelectOpen: false,
    };
  },
  methods: {
    select(item) {
      this.selected = item;
    },
  },
  props: {},
  computed: {
    minPrice:{
      get(){
        return this.$store.getters.minPrice; 
      },
      set(v){
        this.$store.commit("setMinPrice", v);
      }
    },
    maxPrice:{
      get(){
        return this.$store.getters.maxPrice; 
      },
      set(v){
        this.$store.commit("setMaxPrice", v);
      }
    }
  },
};
</script>  
<style lang="scss">
@import "./../scss/_filterPanel.scss";
</style>

