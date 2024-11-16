import * as dotenv from 'dotenv';

dotenv.config();

export interface SetUpEnv {
    PORT: string,
    LOGIN_SECRET: string
    DB_NAME: string
    DB_USER: string
    DB_PWD: string
}
export const getEnv = (): SetUpEnv => {
    return {
        PORT: process.env.PORT ?? '',
        LOGIN_SECRET: process.env.LOGIN_SECRET ?? "",
        DB_NAME: process.env.DB_NAME ?? "",
        DB_USER:process.env.DB_USER ?? "",
        DB_PWD: process.env.DB_PWD ?? "",
    }
}
