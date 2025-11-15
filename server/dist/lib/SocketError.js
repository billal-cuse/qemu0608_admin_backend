"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketError = SocketError;
function SocketError(socket, name, message, error) {
    return socket.emit(name, {
        status: false,
        message,
        error,
    });
}
