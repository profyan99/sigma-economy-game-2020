<template>
  <v-card class="mx-auto" tile>
    <v-card-text>
      <v-row justify="space-around">
        <v-card outlined tile min-width="250px">
          <v-toolbar dense flat color="grey lighten-3">
            <v-toolbar-title>Покупка {{ stockName }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <base-order-form @submit="buy">
              <template #button>
                Купить
              </template>
            </base-order-form>
          </v-card-text>
        </v-card>
        <v-card outlined tile min-width="250px">
          <v-toolbar dense flat color="grey lighten-3">
            <v-toolbar-title>Продажа {{ stockName }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <base-order-form @submit="sell">
              <template #button>
                Продать
              </template>
            </base-order-form>
          </v-card-text>
        </v-card>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import BaseOrderForm from './BaseOrderForm';
  export default {
    name: 'OrderForm',
    components: {BaseOrderForm},
    props: {
      stockName: {
        type: String,
        required: true,
      },
    },
    methods: {
      buy({ amount, price }) {
        console.log(amount, price);
      },
      sell({ amount, price }) {
        console.log(amount, price);
      },
    },
  };
</script>

<style scoped>

</style>