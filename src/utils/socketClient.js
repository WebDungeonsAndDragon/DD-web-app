import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
// const URL = "https://dd-server-xm9y.onrender.com/";
const URL = "http://localhost:8081";

export const socket = io(URL);
