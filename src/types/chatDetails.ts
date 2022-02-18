import { Socket } from "socket.io-client";

export default interface chatDetails {
    username: string,
    socket: Socket
}