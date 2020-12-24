<template>
  <div class="content">
    <div class="form">
      <h3>Register</h3>
      <label for="email">Email</label>
      <input
        v-model="email"
        id="email"
        type="email"
        placeholder="Example@gmail.com"
      />
      <label for="name">Full name</label>
      <input v-model="name" id="name" type="text" placeholder="Tony Stark" />
      <label for="password">Password</label>
      <div class="password">
        <input v-model="password" id="password" type="password" />
        <span> <img class="eye" alt="eye" src="../assets/eye.svg" /></span>
      </div>
      <label for="confirmPassword">confirm password</label>
      <div class="password">
        <input v-model="confirmPassword" id="confirmPassword" type="password" />

        <span> <img class="eye" alt="eye" src="../assets/eye.svg" /></span>
      </div>
      <div class="btn buton">Continue</div>
    </div>
    <div class="blockAuth">
      <p>
        I already have an account,
        <span class="link" @click="$emit('auth')">LOG IN</span>
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
      name: "",
      confirmPassword: "",
    };
  },
  methods: {},
  computed: {},
};
</script>
