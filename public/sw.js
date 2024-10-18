/**
 * Warning: Before you edit this file or merge with other current worker
 * In case of edit or rename, merge with other: be careful existing projects with subscribers registrations on this worker path, can be destroyed after changes and you may occure some issues with deliveribility
 * In case of two workers: be sure that you provide other file name and update project in PushPushGo Dashboard and use /ppg scope.
 * If you have any questions before you take any action please contact with support@pushpushgo.com for consulting service worker change strategy
 */

// importScripts('https://s-eu-1.pushpushgo.com/670e2ec97004ee67a0f4bd85/worker.js');
// importScripts('https://s-eu-1.pushpushgo.com/6616535545aef2aa169c8acb/worker.js');
importScripts('https://s-eu-1.pushpushgo.com/67120c731983c8ad65299c96/worker.js');

// importScripts('https://cdn.pushpushgo.com/670e2ec97004ee67a0f4bd85/worker.js');
// importScripts('https://cdn.pushpushgo.com/6616535545aef2aa169c8acb/worker.js');


// self.addEventListener('install', (event) => {
//     const urlParams = new URL(self.location).searchParams;
//     const ppgId = urlParams.get('ppgId');

//     if (ppgId) {
//         importScripts(`https://s-eu-1.pushpushgo.com/${ppgId}/worker.js`);
//     } else {
//         console.error('No PPG ID provided in the service worker.');
//     }
// });

// self.addEventListener('install', (event) => {
//     const urlParams = new URL(self.location).searchParams;
//     const ppgId = urlParams.get('ppgId');

//     console.log('addEventListener==============', ppgId)
//     if (ppgId) {
//         if (!self.importedScripts) {
//             console.log('!self.importedScripts==============', !self.importedScripts)
//             // importScripts(`https://cdn.pushpushgo.com/${ppgId}/worker.js`);
//             importScripts(`https://s-eu-1.pushpushgo.com/${ppgId}/worker.js`);
//             self.importedScripts = true; // Tránh import lại script
//             console.log('done==============')
            
//         }
//     } else {
//         console.error('No PPG ID provided in the service worker.');
//     }
// });

