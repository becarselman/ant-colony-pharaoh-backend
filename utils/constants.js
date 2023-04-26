module.exports = {
    passwordPolicy: {
        min: 6,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 0,
    },
    userRoles: {
        USER: "USER",
        ADMIN: "ADMIN"
    }
}