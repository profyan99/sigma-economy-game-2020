<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <loader v-if="isLoading"/>
        <v-card class="elevation-12" v-else>
          <v-toolbar color="deep-purple" dark flat>
            <v-toolbar-title>Авторизация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  label="Логин"
                  name="login"
                  prepend-icon="person"
                  type="text"
                  v-model="form.login"
              ></v-text-field>

              <v-text-field
                  id="password"
                  label="Пароль"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                  v-model="form.password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                @click="login"
            >
              Войти на биржу
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';

  import Loader from './Loader';

  export default {
    name: 'Login',
    components: {
      Loader,
    },
    data() {
      return {
        isLoading: false,
        form: {
          login: '',
          password: '',
        },
      };
    },
    methods: {
      login() {
        axios.post('/me', this.form)
          .then(() => {
            this.$emit('login');
          })
          .catch(() => {
            alert('Неверный логин или пароль');
          })
          .finally(() => {
            this.isLoading = false;
          });
      },
    },
  };
</script>

<style scoped>

</style>