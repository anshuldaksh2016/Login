const bcrypt = require('bcrypt');

class Router {
    constructor(app,client){
        this.login(app,client);
        this.logout(app , client);
        this.isLoggedIn(app , client);
        }
        login(app , client){
            app.post('/login',(req,res) => {
                    let username = req.body.username;
                    let password = req.body.password;

                    console.log(username);
            });
        }
        logout(app , client){

        }
        isLoggedIn(){

        }
}

module.exports = Router ;