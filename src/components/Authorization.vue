<template>
  <div class="content">
    <div class="form">
      <h3>Login</h3>
      <label for="email">Email</label>
      <input
        v-model="email"
        id="email"
        type="email"
        placeholder="Example@gmail.com"
      />
      <label for="password">Password</label>
      <div class="password">
        <input
          v-model="password"
          id="password"
          :type="passwordView ? 'text' : 'password'"
          placeholder="Enter password"
        />
        <span @click="passwordView = !passwordView">
          <img alt="eye" class="eye" src="../assets/eye.svg"
        /></span>
      </div>
      <p class="forgotPassword">Don’t remember password?</p>
      <p v-if="error" class="error">{{ error }}</p>
      <div @click="login()" v-if="!loading" class="btn buton">Continue</div>
      <div v-else class="btn buton disabled">Loading...</div>
    </div>
    <div class="blockAuth">
      <p>
        I have no account,
        <span class="link" @click="$emit('register')">REGISTER NOW</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Registration",
  data() {
    return {
      email: "",
      password: "",
      passwordView: false,
    };
  },
  methods: {
    login() {
      const userObj = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("loginUser", userObj).then(() => {
        this.$router.push("/");
      });
    },
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
  },
};
</script>
