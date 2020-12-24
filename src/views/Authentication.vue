<template>
  <div>
    <Authorization v-if="authoization" @register="changeAuthBlock(false)" />
    <Registration v-else @auth="changeAuthBlock(true)" />
  </div>
</template>
<script>
import Authorization from "@/components/Authorization.vue";
import Registration from "@/components/Registration.vue";
export default {
  data() {
    return {
      authoization: true,
    };
  },
  components: {
    Authorization,
    Registration,
  },
  methods: {
    changeAuthBlock(action) {
      this.authoization = action;
    },
  },
  created() {},
};
</script>  
<style lang="scss">
@import "./../scss/_authentication.scss";
</style>;
