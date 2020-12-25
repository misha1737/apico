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
      <input v-model="name" id="name" type="text" @change='userError=null' placeholder="Tony Stark" />
      <label for="password">Password</label>
      <div class="password">
        <input v-model="password" id="password" @change='userError=null' :type="passwordView ? 'text': 'password'"  />
        <span> <img @click="passwordView=!passwordView" class="eye" alt="eye" src="../assets/eye.svg" /></span>
      </div>
      <label for="confirmPassword">confirm password</label>
      <div class="password">
        <input v-model="confirmPassword" id="confirmPassword" :type="cPasswordView ? 'text': 'password'" />

        <span @click="cPasswordView=!cPasswordView"> <img class="eye" alt="eye" src="../assets/eye.svg" /></span>
      </div>
      <p v-if="userError" class="error">{{userError}}</p>
      <p v-if="error" class="error">{{error}}</p>
      <div class="btn buton" @click="register()">Continue</div>
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
      userError: null,
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      cPasswordView:false,
      passwordView:false
    };
  },
  methods: {
    register(){
      if(this.password!=this.confirmPassword){
        this.userError="password and confirm password not matched"
        return
      }
        const userObj={
          email:this.email,
           password:this.password, 
           userName:this.name
        }
       this.$store.dispatch("registerUser", userObj);
    }
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
