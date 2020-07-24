import * as SockJS from 'sockjs-client';

import store from './store';

let client;

const handleMessages = async (data) => {
  const {infoType, ...payload} = JSON.parse(data);

  if (infoType === 'AccountDTO') {
    await store.dispatch('game/setAccount', payload);
  } else if (infoType === 'OrderInfoDTO') {
    await store.dispatch('game/setOrders', payload);
  } else {
    console.error('Undefined payload type: ', infoType);
  }
};

export const connect = () => {
  client = new SockJS(`http://${window.location.hostname}:12345`);

  client.onmessage = handleMessages;

  client.onerror = (event) => {
    console.error('Error in ws: ', event);
  };

  return new Promise((resolve, reject) => {
    client.onopen = (event) => {
      resolve(event);
    };

    client.onclose = (event) => {
      reject(event);
    };
  });
};

export const disconnect = () => {
  client && client.close();
};