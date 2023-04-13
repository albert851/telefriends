import { io } from 'socket.io-client';

const socket = io("http://localhost:6543");

export default socket;

