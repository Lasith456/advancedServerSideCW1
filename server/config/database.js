import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const db = new sqlite3.Database(process.env.DB_FILE, (err) => {
    if (err) {
        console.error('Error connecting to SQLlite:', err.message);
    } else {
        console.log('Connected to SQLlite database.');
    }
});

const createTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            password TEXT NOT NULL,
            userRole INTEGER DEFAULT 0
        );
    `;
    const apiKeysTableSQL = `
        CREATE TABLE IF NOT EXISTS api_keys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            api_key TEXT NOT NULL,
            expires_at DATETIME NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `;
    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table has been created.');
        }
    });
    db.run(apiKeysTableSQL, (err) => {
        if (err) {
            console.error('Error creating apiKey table table:', err.message);
        } else {
            console.log('api_keys table has been created.');
        }
    });
};

const dropTable = async () => {
    const sql = `DROP TABLE IF EXISTS users;`;
    db.run(sql, (err) => {
        if (err) {
            console.error('Error dropping table:', err.message);
        } else {
            console.log('Users table has been dropped.');
        }
    });
    const apiKeysTableSQL = `DROP TABLE IF EXISTS api_keys;`;
    db.run(apiKeysTableSQL, (err) => {
        if (err) {
            console.error('Error dropping table:', err.message);
        } else {
            console.log('api_keys table has been dropped.');
        }
    });
};

export { db, createTable, dropTable };
