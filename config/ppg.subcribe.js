export const PPG_SUBCRIBE = `
window.addEventListener('load', function() {
    const config = {
      projectId: '6616535545aef2aa169c8acb',
      vapidPublicKey: 'CONTACT_WITH_SUPPORT_FOR_CODE',
      isHTTPS: true, 
    };

    const client = new ppg.sdk.Client(config);

    const state = document.querySelector('#state');
    const crmId = document.querySelector('#crmId');
    const subscribe = document.querySelector('#subscribe');
    const unsubscribe = document.querySelector('#unsubscribe');

    function setState(status) {
      const li = document.createElement('li');
      li.innerText = status;
      state.appendChild(li);
    }

    function toggleButton(element, value) {
      element.disabled = typeof value === 'boolean' 
        ? !value 
        : !element.disabled;
    }

    subscribe.addEventListener('click', function(event) {
      event.preventDefault();
      // Manage subscription, add some tags or set customId
      client.register()
        .then(subscriberId => {
          setState(`user subscribed! ${ subscriberId }`);
          toggleButton(unsubscribe, true);
          toggleButton(subscribe, false);
          return Promise.all([
            client.appendTags(['registered user', 'self sign']),
            client.setCustomId(crmId.innerText)
          ])
        })
        .then(() => client.send(true)) // immedietely flag (do not wait for beacon and end session)
        .catch(() => {
          toggleButton(subscribe, false);
          setState('client reject subscription in browser - we cannot show second time prompt - only when user unlock notifications in this domain');
        });
    });

    unsubscribe.addEventListener('click', function(event) {
      event.preventDefault();
      // Manage subscription, add some tags or set customId
      client.unsubscribe()
        .then(() => {
          setState(`user unsubscribed!`);
          toggleButton(unsubscribe, false);
          toggleButton(subscribe, true);
        });
    });

    // Check if browser supports push
    client
      .isPushSupport()
      .then(() => client.isSubscribed())
      .then(isSubscribed => client.getId())
      .then(subscriberId => {
        setState('push notifications is supported');
        if (!subscriberId) {
          setState('activate subscribe button');
          toggleButton(subscribe, true);
        } else {
          setState(`is already subscribed ${ subscriberId } `);
          toggleButton(unsubscribe, true);
        }
      })
      .catch(() => {
        setState('push is not supported')
      });
    });
`