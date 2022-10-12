"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configdb_1 = __importDefault(require("./configdb"));
const pg_1 = require("pg");
const pool = new pg_1.Pool(configdb_1.default.database);
pool.connect(function (err, conn) {
    if (err) {
        console.log('el codigo del error es:', err.stack);
    }
    else {
        if (conn) {
            conn.release();
        }
    }
    console.log('conexiones establecidas con:', configdb_1.default.database);
});
exports.default = pool;
