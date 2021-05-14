import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import'./App.css';
import Pokemon from './pokemonview';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            errors:'',
            password:'',
            redirect:false
        }
        this.loginfunction = this.loginfunction.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    loginfunction(e){
        e.preventDefault();

        let errors = this.validateLoginForm();
        
        if(errors === true){
            if (this.state.email === 'luisgp@xcaret.com' && this.state.password === 'XlcuAirsEt') {
                localStorage.setItem("User", this.state.email);
                localStorage.setItem("Password", this.state.password);
                this.setState({redirect : true});
            }else{
                alert('The user or password is incorrect')
            }
            
        } else {
            if (errors.email) {
                alert(errors.email);
            } else if (errors.password){
                alert(errors.password);
            } else {
                return false;
            }                        
        }
      
    }

    validateLoginForm = (e) => {
        
        let errors = {};

        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        
        if (!this.state.email) {
            errors.email = "Email can't be blank";
            return errors;
        }else if (!emailRegex.test(this.state.email)) {
            errors.email = "Please enter a valid email";
            return errors;
        }
        if (!this.state.password) {
            errors.password = "Password can't be blank";
            return errors;
        }

        return true;
    }

     
    onChangeEmail(e){
        this.setState({email:e.target.value});
    }

    onChangePassword(e){
        this.setState({password:e.target.value});
    }

    render() {
        if(localStorage.getItem('User') === 'luisgp@xcaret.com' && localStorage.getItem('Password') === 'XlcuAirsEt'){
            return (<Pokemon ></Pokemon>);
        }else if(this.state.redirect === true){
            return (<Pokemon ></Pokemon>);
        }
        return (
          <div id="Contenedor">
          <br></br>
            <div className="ContentForm">
                <form action="" method="post" name="formData">
                  <div className="input-group mb-3">
                    <label className="input-group-text">Email</label>
                    <input type="email" className="form-control" name="email" placeholder="E-mail" id="email" required value={this.state.email} onChange={(e)=>this.onChangeEmail(e)}></input>
                    <br/>
                  </div>
                  <div className="input-group input-group-lg">
                  <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="******" required value={this.state.password} onChange={(e)=>this.onChangePassword(e)}></input>
                  </div>
                  <br></br>
                  <button className="btn waves-effect waves-light" type="submit" name="action" onClick={(e) => this.loginfunction(e)}>Login
                  </button>
                </form>
            </div>
          </div>
        )
    }
}

export default Login;
