<template>
  <v-app>
    <nav-bar class="nav-bar" :is-logged="isLogged"/>
    <v-main>
      <loader v-if="isLoading"/>
      <template v-else>
        <login v-if="!isLogged" @login="onLogin"/>
        <exchange v-else/>
      </template>
    </v-main>
  </v-app>
</template>

<script>
//import axios from 'axios';

import Login from './components/Login';
import Loader from './components/Loader';
import Exchange from './components/Exchange';
import NavBar from './components/NavBar';

export default {
  name: 'App',
  components: {
    NavBar,
    Exchange,
    Loader,
    Login,
  },
  data() {
    return {
      isLogged: false,
      isLoading: true,
      account: {},
    };
  },
  created() {
    this.getAccount();
  },
  methods: {
    getAccount() {
      this.isLoading = false;
      this.isLogged = true;
     /* axios.get('/me')
        .then(({ account }) => {
          this.account = account;
          this.isLogged = true;
        })
        .catch(() => {})
        .finally(() => {
          this.isLoading = false;
        });*/
    },
    onLogin() {
      this.getAccount();
    },
  },
}
</script>

<style scoped>
.nav-bar {
  flex: 0 0;
}
</style>
