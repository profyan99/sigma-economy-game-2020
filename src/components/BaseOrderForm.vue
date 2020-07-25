<template>
  <v-form>
    <v-text-field
        label="Количество"
        name="amount"
        type="number"
        v-model="form.amount"
    ></v-text-field>

    <v-text-field
        label="Цена"
        name="price"
        type="number"
        v-model="form.price"
    ></v-text-field>

    <v-text-field
        label="Итоговая сумма"
        name="total"
        type="number"
        v-model="form.total"
    ></v-text-field>

    <v-btn
        block
        color="primary"
        :disabled="Boolean(lastOrder)"
        @click="$emit('submit', form)"
    >
      <slot name="button"></slot>
    </v-btn>
  </v-form>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'BaseOrderForm',
    data() {
      return {
        form: {
          amount: 0,
          price: 0,
          total: 0,
        },
      };
    },
    computed: {
      ...mapState('game', ['lastOrder']),
      amount() {
        return this.form.amount;
      },
      price() {
        return this.form.price;
      },
      total() {
        return this.form.total;
      }
    },
    watch: {
      amount() {
        this.form.total = this.amount * this.price;
      },
      price() {
        this.form.total = this.amount * this.price;
      },
      total() {
        if(!this.amount) {
          return;
        }

        this.form.price = this.total / this.amount;
      },
    },
  };
</script>

<style scoped>

</style>