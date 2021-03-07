const authRepository = require("../DAL/authRepository")

class AuthContoller {
    async register(user){
       return await authRepository.register(user);
    }

    async login(name,password){
        return await authRepository.login(name,password)
    }
}

module.exports = new AuthContoller()