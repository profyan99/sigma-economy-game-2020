<template>
  <div class="wrapper">
    <v-progress-circular
      indeterminate
      color="primary"
      class="loading"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: 'Loader',
};
</script>

<style scoped>
.wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
