module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "jangid01",
    DB: "my-backend-app",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}