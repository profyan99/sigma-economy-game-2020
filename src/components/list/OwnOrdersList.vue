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
          <th class="text-left">№</th>
          <th class="text-left">Тип</th>
          <th class="text-left">Цена</th>
          <th class="text-left">Количество</th>
          <th class="text-left">Сумма</th>
          <th class="text-left">Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in ordersSorted" :key="order.orderId">
          <td>{{ order.orderId }}</td>
          <td class="type">{{ order.type }}</td>
          <td>{{ order.price.toFixed(2) }}</td>
          <td>{{ `${order.residual}/${order.amount}` }}</td>
          <td>{{ (order.price * order.amount).toFixed(2) }}</td>
          <td class="actions">
            <v-btn icon color="grey darken-1" @click="deleteOrderId = order.orderId">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <delete-order-dialog :order-id="deleteOrderId" @end="deleteOrderId = -1"/>
  </v-card>
</template>

<script>
  import DeleteOrderDialog from '../dialog/DeleteOrderDialog';

  export default {
    name: 'OwnOrdersList',
    components: {DeleteOrderDialog},
    props: {
      orders: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        activeOrderId: -1,
        deleteOrderId: -1,
      };
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

  .actions {
    min-width: 120px;
  }

  .type {
    min-width: 120px;
  }
</style>