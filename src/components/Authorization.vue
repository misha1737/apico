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
          type="password"
          placeholder="Enter password"
        />
        <span> <img alt="eye" class="eye" src="../assets/eye.svg" /></span>
      </div>
      <p class="forgotPassword">Don’t remember password?</p>
      <div class="btn buton">Continue</div>
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
    };
  },
  methods: {},
  computed: {},
};
</script>
