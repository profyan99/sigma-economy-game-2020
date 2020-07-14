<template>
  <v-app-bar color="deep-purple" dense>
    <v-toolbar-title>
      <a class="logo" href="/">
        Сигма.<b>Биржа</b>
      </a>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text small color="white" v-if="isLogged">
      Выход
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    isLogged: {
      type:Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.logo {
  text-decoration: none;
  outline: none;
  color: white;
}

.logo:hover {
  opacity: 0.8;
}
</style>
