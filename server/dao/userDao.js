import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';

dotenv.config();
class UserDAO {
    constructor() {
        this.init();
    }

    async init() {
        this.db = await open({
            filename: process.env.DB_FILE,
            driver: sqlite3.Database
        });

        await this.db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,email TEXT UNIQUE NOT NULL,password TEXT NOT NULL)');
        await this.db.exec('CREATE TABLE IF NOT EXISTS api_keys (id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,api_key TEXT NOT NULL,expires_at DATETIME NOT NULL,FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)');

    }

    async createUser(name, email, hashedPassword) {
        try {
            const result = await this.db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',[name, email, hashedPassword]);
            return result.lastID;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findUserByEmail(email) {
        return await this.db.get('SELECT * FROM users WHERE email = ?', [email]);
    }
    async storeUserAPIKey(user_id,api_key,expiredIn) {
        try {
            const result = await this.db.run('INSERT INTO api_keys (user_id, api_key, expires_at) VALUES (?, ?, ?);', [user_id,api_key,expiredIn]);
            return result.lastID;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async findUserByApiKey(user_id) {
        return await this.db.get('SELECT * FROM api_keys WHERE user_id = ? ORDER BY id DESC LIMIT 1', [user_id]);
    }
    async deleteLastApiKey(user_id) {
        return await this.db.run(
            'DELETE FROM api_keys WHERE id = (SELECT id FROM api_keys WHERE user_id = ? ORDER BY id DESC LIMIT 1)',
            [user_id]
        );
    }
    
}

const userDao = new UserDAO();
export default userDao;