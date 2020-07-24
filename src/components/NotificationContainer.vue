<template>
  <div class="notifications-wrapper">
    <div class="app">
      <transition-group appear name="slide-right">
        <notification-item
            class="notification"
            v-for="notification in notifications"
            :key="notification.id"
            v-bind="notification"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import NotificationItem from './NotificationItem';

  export default {
    name: 'NotificationContainer',
    components: {
      NotificationItem,
    },
    computed: {
      ...mapState('app', ['notifications']),
    },
  };
</script>

<style scoped>
.notifications-wrapper {
  z-index: 100;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
}

.app {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  right: 0;
}

.notification {
  margin: 5px 0;
}

.notification:last-child {
  margin-bottom: 0
}

.notification:first-child {
  margin-top: 0;
}

.slide-right-leave-active {
  position: fixed;
}

.slide-right-leave-active,
.slide-right-enter-active {
  transition: all .5s;
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translate(100%, 0);
}

</style>