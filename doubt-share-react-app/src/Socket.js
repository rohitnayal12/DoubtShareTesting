// socket.js
import { io } from 'socket.io-client';

// let socket;

// export const initializeSocket = () => {
//     if (!socket) {
//         socket = io('http://localhost:3300');
//     }
//     return socket;
// };
let socket;
export const initializeSocket = () => {

    socket = io('http://localhost:3300');
    return socket;
};

export default socket;
