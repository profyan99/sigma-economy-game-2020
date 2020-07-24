<template>
  <div
      :key="id"
      class="notification"
      @click="remove"
      @mouseover="setMouseOver(true)"
      @mouseleave="setMouseOver(false)"
      :class="{ error: isError }"
  >
    <span class="content">
      {{ text }}
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'NotificationItem',
  props: {
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    timeout: {
      type: Number,
      default: 4000,
    },
  },
  data() {
    return {
      timerId: null,
      isMouseOver: false,
    };
  },
  computed: {
    isError() {
      return this.type === 'ERROR';
    },
  },
  methods: {
    ...mapActions('app', ['removeNotification']),
    setMouseOver(value) {
      this.isMouseOver = value;
      if (!value && !this.timerId) {
        this.remove();
      }
    },
    remove() {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.removeNotification(this.id);
      this.timerId = null;
    },
  },
  mounted() {
    this.timerId = setTimeout(() => {
      if (!this.isMouseOver) {
        this.removeNotification(this.id);
      }
      this.timerId = null;
    }, this.timeout);
  },
};
</script>

<style scoped>
.notification {
  max-width: 250px;
  min-height: 50px;
  height: fit-content;
  max-height: 200px;
  background-color: rgba(255, 255, 255, 0.73);
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  cursor: pointer;
  opacity: 1;
  padding: 10px;
  font-weight: 400;
  font-size: 14px;
  color: #2b2b2b;
  overflow: hidden;
}

.notification:hover {
  opacity: 0.9;
}

.notification.error {
  background-color: rgba(255, 0, 0, 0.92);
  color: rgba(255, 255, 255, 0.86);
}

</style>