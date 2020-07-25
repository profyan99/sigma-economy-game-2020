<template>
  <v-card class="mx-auto" tile>
    <v-toolbar dense flat color="grey lighten-3">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-simple-table height="350px" dense>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Цена</th>
          <th class="text-left">Количество</th>
          <th class="text-left">Сумма</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in ordersSorted"
            :key="order.orderId"
            :class="{ own: isOwn(order) }"
        >
          <td>{{ order.price.toFixed(2) }}</td>
          <td>{{ `${order.residual}/${order.amount}` }}</td>
          <td>{{ (order.price * order.amount).toFixed(2) }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
  export default {
    name: 'OrderList',
    props: {
      orders: {
        type: Array,
        required: true,
      },
      ownOrders: {
        type: Array,
        required: true,
      },
      title: {
        type: String,
        required: true,
      }
    },
    computed: {
      ordersSorted() {
        return this.orders && this.orders
          .slice()
          .sort((order1, order2) => order2.price - order1.price);
      },
    },
    methods: {
      isOwn(order) {
        return Boolean(this.ownOrders.find((ownOrder) => ownOrder.orderId === order.orderId));
      }
    },
  };
</script>

<style scoped>
tbody > tr:hover {
  background-color: #F5F5F5 !important;
}
.own {
  background-color: #EDE7F6 !important;
}
</style>