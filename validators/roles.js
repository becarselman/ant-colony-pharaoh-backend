const userRoles = require("../configuration/user-roles")

function doesRoleExist(role) {
    for (const key in userRoles) {
        if (userRoles[key] === role) {
            return true
        }
    }
    
    return false
}

module.exports = {
    doesRoleExist
}