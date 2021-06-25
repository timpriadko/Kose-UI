https://odore.ml/#/
логин: admin@example.com
пароль: testtest1234

https://odore.ml/#/campaigns/74b8c818-4895-483a-a9a9-30bc1f839d3c - KR
https://box.odore.ml/devices/37457270-8ef8-4fac-a6ad-bdb2b43a796c/index.html - KR device
https://odore.ml/#/devices/37457270-8ef8-4fac-a6ad-bdb2b43a796c - рубутнуть

https://odore.ml/#/campaigns/241779d0-7c97-416d-a985-0d8aeb91df7f - Odessa
https://box.odore.ml/devices/3fb6c8ab-60e1-4195-baf3-af6c1e5e2ce8/index.html - Odessa device
https://odore.ml/#/devices/3fb6c8ab-60e1-4195-baf3-af6c1e5e2ce8 - рубутнуть


Kose test campaign
https://odore.ml/#/campaigns/6673222e-857b-45e3-8e70-835833eb2b35 - кампания
https://box.odore.ml/devices/b95ca35a-8d47-47a7-81ee-3fd66f551ca7/index.html - ссылка на девайс

Kose 4 prod - test
https://portal.odore.co.uk/#/campaigns/0f2d1ff4-c1ad-431b-bd03-4db6dd993642 - campaign
https://device.odore.co.uk/devices/138a634d-391f-467e-905d-86081b5c9e2d/index.html - ссылка на девайс (девайс виртуальный)


restore websocket connection script:

const {
    trayId,
    delay,
    cooldown,
    nextStep,
    firstStep,
    isMobile,
    deviceId,
    pollSessionId,
  } = odoreConfig;
  let timerId = null;

  function socketHandler({ data }) {
    const { type, url } = JSON.parse(data);

    if (type === 'connected') {
      disableControls();
    } else if (type === 'update') {
      window.location.replace(url);
    } else if (type === 'timer' && delay && firstStep) {
      clearTimeout(timerId);
      timerId = goToStart(Date.now() + delay);
    }
  };

  const socket = new WebSocket(`wss://${window.location.host}/mobile/devices/${deviceId}/${pollSessionId}/qr/device`);
  socket.addEventListener('message', socketHandler);

script to portal:

const startWS = function(url) {

var websocket = new WebSocket(url);

websocket.onmessage = function (event) {
        ws_dispatch_action(event.data);
};

websocket.onopen = function() {
     window.ws_send = websocket.send;
     window.ws_isopen = true;
};

websocket.onerror = function(error) {
        console.warn(error);
};

websocket.onclose = function() {
    if (!window.ws_needclose) {
       setTimeout( startWS(url), 100);
   }
}


return websocket
}