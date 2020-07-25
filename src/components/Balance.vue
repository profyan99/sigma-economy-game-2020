<template>
  <v-card class="mx-auto" tile>
    <v-toolbar dense flat color="grey lighten-3">
      <v-toolbar-title>Баланс</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Название</th>
          <th class="text-left">Текущее</th>
          <th class="text-left">Заблокировано</th>
          <th class="text-left">Изменение</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Деньги</td>
          <td>{{ account.money }}</td>
          <td>{{ account.blockedMoney }}</td>
          <td :class="{ positive: account.deltaMoney > 0, negative: account.deltaMoney < 0 }">
            {{ `${account.deltaMoney > 0 ? '+' : ''}${account.deltaMoney}` }}
          </td>
        </tr>
        <tr v-for="item in items" :key="item.name">
          <td>Акция {{ item.name }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.blocked }}</td>
          <td :class="{ positive: item.isPositive, negative: item.isNegative }">
            {{ item.delta }}
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'Balance',
    computed: {
      ...mapState('game', ['account']),
      items() {
        return Object.keys(this.account.items)
          .map((key) => ({
            name: key,
            amount: this.account.items[key],
            blocked: this.account.blockedItems[key],
            delta: this.account.deltaItems[key],
            isPositive: this.account.deltaItems[key] > 0,
            isNegative: this.account.deltaItems[key] < 0,
          }));
      },
    },
  };
</script>

<style scoped>
.positive {
  color: #349134;
  font-weight: bold;
}
.negative {
  color: #c14646;
  font-weight: bold;
}
</style>