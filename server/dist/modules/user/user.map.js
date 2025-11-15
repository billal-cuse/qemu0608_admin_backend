"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSocketMap = exports.SocketMap = void 0;
exports.SocketMap = new Map();
class UserSocketMap {
}
exports.UserSocketMap = UserSocketMap;
_a = UserSocketMap;
UserSocketMap.addSocket = async (userId, socketId) => {
    if (!exports.SocketMap.has(userId))
        exports.SocketMap.set(userId, new Set());
    exports.SocketMap.get(userId).add(socketId);
};
UserSocketMap.removeSocket = async (userId) => {
    const sockets = exports.SocketMap.get(userId);
    if (sockets) {
        exports.SocketMap.delete(userId);
        if (sockets.size === 0) {
            exports.SocketMap.delete(userId);
        }
    }
};
