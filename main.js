const webPush = require('web-push');

const vapidKeys = {
    'publicKey' : "BIwFGq9rha5D8PXxSXNLaqQlz6uIQXrGQHgybdz-5Mms2Ol_lwkRTOXXs-ZKjbhK719oLZEf6AW3Guue5n09jZ8",
    'privateKey': "_pG9ZyJV-rQqlsSpXoBOW2CKKcUyMb9zl-CgnybyhL0"
}

webPush.setGCMAPIKey("AAAAhZPWl5s:APA91bH2-4c67ON3zho6bUmO-BOXyUX72U7JskFD9cBScdxbdet_kj_fatJLbua0KAgC9sJ69-atW7ivNt8v8ODCfqBwGHoYT-FVMUv7LisPr7AthQjQsGtobrfLnsFDB3kwdqHWjYfE");
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/dNfkVGdsebw:APA91bHOtjbReezdba0YlRgYySWJdOhz7Dw_xD2xMZz0vdJdwCh-bXGkorYjTHxMLZpWWqpSnAg5euVD7HUrvXiREt6TO5SVMChic6ScLdMGD5YIVO7xWbi92F0mTU_x_TgRoABllnRT",
    keys: {
        auth : "N5DDFZSthgJ8lWtToZGe9A==",
        p256dh : "BMH+BVNv+lz/zCGS5t0byxDkQao9BjHiEmFnSkCGcNoJq18YZvhviSFPd4crGI8C/+iu52/X4+Hfxleuw9LEh4E="
    }
};

let payload = 'Notification with payload, is works!';
let options = {
    gcmAPIKey: '573710964635',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription, payload, options
);