<template>
  <v-card class="mx-auto" tile>
    <v-toolbar dense flat color="grey lighten-3">
      <v-toolbar-title>Мои заказы</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-simple-table height="350px" dense>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Цена</th>
          <th class="text-left">Количество</th>
          <th class="text-left">Итоговая сумма</th>
          <th class="text-left">Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in ordersSorted" :key="order.id">
          <td>{{ order.price }}</td>
          <td>{{ order.amount }}</td>
          <td>{{ order.price * order.amount }}</td>
          <td>
            <v-btn icon color="grey darken-1" class="edit-icon">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon color="grey darken-1">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
  export default {
    name: 'OwnOrdersList',
    props: {
      orders: {
        type: Array,
        required: true,
      },
    },
    computed: {
      ordersSorted() {
        return this.orders && this.orders
          .slice()
          .sort((order1, order2) => order2.price - order1.price);
      }
    },
  };
</script>

<style scoped>
.edit-icon {
  margin-right: 10px;
}

tbody > tr:hover {
  background-color: #F5F5F5 !important;
}
</style>