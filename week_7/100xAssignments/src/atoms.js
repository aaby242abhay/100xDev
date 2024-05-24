import { atom, selector } from 'recoil';
import axios from 'axios';

//putting default data asynchronously into the atom

export const notifications = atom({
    key : "networkAtom",
    default : selector({
        key : "networkAtomDefault",
        get : async ()=>{
            const res = await axios.get("https://sum-server.100xdevs.com/notifications");
            return res.data;
        }
    })

})


//putting default data synchronously into the atom

// export const notifications = atom({
//     key : "networkAtom",
//     default : {
//         network : 0,
//         jobs : 0,
//         messaging : 0,
//         notifications : 0
//     }
// })

export const totalNotificationSelector = selector({
    key : "totalNotificationSelector",
    get : ({get}) =>{
        const allNotifications = get(notifications);
        return allNotifications.network + allNotifications.jobs + allNotifications.messaging + allNotifications.notifications;
    }
})

























// export const networkAtom = atom({
//     key : "networkAtom",
//     default : 104
// })  

// export const jobsAtom = atom({
//     key : "jobsAtom",
//     default : 0
// })  

// export const notificationsAtom = atom({
//     key : "networkAtnotificationsAtom",
//     default : 12
// })  

// export const messagingAtom = atom({
//     key : "messagingAtom",
//     default : 0
// })  

// export const totalNotificationSelector = selector({
//     key : "totalNotificationSelector",
//     get : ({get}) => {
//         const network = get(networkAtom);
//         const jobs = get(jobsAtom);
//         const notifications = get(notificationsAtom);
//         const messaging = get(messagingAtom);
//         return network + jobs + notifications + messaging;
//     }

// })