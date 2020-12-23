import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import firestore from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    const firebaseConfig = {
      apiKey: "AIzaSyDoLsrChGA9gfixKQQXWIy2RbwjF7Lh3i8",
      authDomain: "apico-b2bbf.firebaseapp.com",
      databaseURL: "https://apico-b2bbf-default-rtdb.firebaseio.com",
      projectId: "apico-b2bbf",
      storageBucket: "apico-b2bbf.appspot.com",
      messagingSenderId: "475786134248",
      appId: "1:475786134248:web:b0ab07fc56e14abb5fbf5d"
    };

     firestore.initializeApp(firebaseConfig);
    // firestore.auth().onAuthStateChanged(user=>{
    //   if (user){
    //     this.$store.dispatch('loggedUser',user);
    //   }
    //   this.$store.dispatch('getPosts');
    //   this.$store.dispatch('loadCategories');
    // })
  }
}).$mount('#app')

