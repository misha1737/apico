<template>
  <div class="content">
    <div>
      <h3>Login</h3>
      <label for="email">Email</label>
      <input
        v-model="email"
        id="email"
        type="email"
        placeholder="Example@gmail.com"
      />
      <label for="password">Password</label>
      <input
        v-model="password"
        id="password"
        type="password"
        placeholder="Enter password"
      />
      <span> <img alt="eye" src="../assets/eye.svg" /></span>
      <span>Don’t remember password?</span>
      <div>Continue</div>
    </div>
    <div>
      <p>
        I have no account, <span @click="$emit('register')">REGISTER NOW</span>
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
