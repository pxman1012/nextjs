export const PPG_TOGGLE = `
window.addEventListener('load', function() {
    const config = {
      endpoint: "https://api.pushpushgo.com",
      projectId: '6616535545aef2aa169c8acb',
      vapidPublicKey: 'BJTbbSOYMYuP-9iP3cwbmou2ijtn4sze2eaijugC-IUN3iRUpGhmA8rqml3JmMo10ICAXBNO0EOc5oOE67QFw4U',
      isHTTPS: true, 
    };

    const client = new ppg.sdk.Client(config);
    const toggle = document.querySelector('#ppg-switch');
    const state = document.querySelector('#state');

    function setState(status) {
      if (!status) {
        state.innerText = "";
        return;
      }
      state.innerText = "(" + status + ")";
    }

    toggle.addEventListener('click', function(event) {
      setState("please accept prompt");
      // Manage subscription, add some tags or set customId
      client.register()
        .then(subscriberId => {
          console.log(subscriberId);
          setState("subscribed");
          if (!event.target.checked) {
            // Manage subscription, add some tags or set customId
            setState(`unregister...`);
            client.unsubscribe()
              .then(() => {
                setState();
              });
          } else {
            setState()
            return client
              .appendTags(['toggle:true'])
              .then(() => client.send(true))
          }
        })
        .catch((e) => {
          console.error(e);
          setState(e.message)
          toggle.disabled = true;
          console.log('client reject subscription in browser - we cannot show second time prompt - only when user unlock notifications in this domain');
        });
    });

    // Check if browser supports push
    client
      .isPushSupport()
      .then(() => client.isSubscribed())
      .then(isSubscribed => client.getId())
      .then(subscriberId => {
        setState('click to subscribe');
        if (!subscriberId) {
          console.log('activate subscribe button');
          toggle.disabled = false;
        } else {
          setState('subscribed')
          console.log(`is already subscribed ${ subscriberId } `);
          toggle.checked = true;
        }
      })
      .catch(() => {
        setState('not supported')
        toggle.disabled = true;
        console.log('push is not supported')
      });
    });
`