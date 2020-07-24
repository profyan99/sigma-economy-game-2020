import store from './store';

const notificationPlugin = {
  install: (vue) => {
    const addNotification = (text, type) => {
      store.dispatch('app/addNotification', {
        text,
        type,
      });
    };

    vue.prototype.$notification = {
      error: (text) => {
        addNotification(text, 'ERROR');
      },
      info: (text) => {
        addNotification(text, 'INFO');
      },
    };
  },
};

export default notificationPlugin;