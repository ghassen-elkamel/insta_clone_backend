export const CONFIG = {
    host: {
        url: '<server-url>',
        port: '3000',
    },
    jwt: {
        secretOrKey: "secret",
        expiresIn: 36000000,
    },

}
// ACCESS REFRESH TOKEN TIME OUT
export const ACCESS_TOKEN_TIMEOUT = "300s"
export const REFRESH_TOKEN_TIMEOUT = "2400h"
export const RESET_TOKEN_TIMEOUT = "1h"
// DATABASE TOKENS
export const USER_PROVIDER = 'UserProvider';
export const DB_PROVIDER = 'DatabaseToken';