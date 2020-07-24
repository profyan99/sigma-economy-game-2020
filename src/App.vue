<template>
  <v-app>
    <notification-container />
    <nav-bar class="nav-bar" :is-logged="isLoggedIn"/>
    <v-main>
      <loader v-if="isLoading"/>
      <template v-else>
        <login v-if="!isLoggedIn" @success="tryToConnect"/>
        <exchange v-else/>
      </template>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import Login from './components/Login';
import Loader from './components/Loader';
import Exchange from './components/Exchange';
import NavBar from './components/NavBar';
import NotificationContainer from './components/NotificationContainer';
import { connect, disconnect } from './websocket';

export default {
  name: 'App',
  components: {
    NotificationContainer,
    NavBar,
    Exchange,
    Loader,
    Login,
  },
  methods: {
    ...mapActions('app', ['setLoading', 'setLoggedIn']),
    tryToConnect() {
      this.setLoading(true);
      connect()
        .then(() => {
          this.setLoggedIn(true);
        })
        .catch((error) => {
          console.log('Could not establish connection', error);
          this.setLoggedIn(false);
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
  },
  created() {
    this.tryToConnect();
  },
  beforeDestroy() {
    disconnect();
  },
  computed: {
    ...mapGetters('app', ['isLoggedIn']),
    ...mapState('app', ['isLoading']),
  },
}
</script>

<style scoped>
.nav-bar {
  flex: 0 0;
}
</style>
