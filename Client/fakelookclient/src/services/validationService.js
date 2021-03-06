const validationService = {
    nameValidation(name){
        return 2 < name.length && name.length < 20 && name.indexOf(' ') === -1;
    },

    passwordValidation(password){
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/gm.test(password)
    }
}

export default validationService;