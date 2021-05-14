import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import'./App.css';
import Login from './login';
import Table from './components/table';
import logo from './assets/pokebola.png';
import title from './assets/title.png';

class Pokemon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon:[],
            logout: false
        }
    }

    logout(e){
        e.preventDefault();
        localStorage.clear();
        this.setState({logout: true});
    }

    render() {
        if(this.state.logout === true){
            return (<Login ></Login>);
        }
        return (
            <div id="ContenedorView">
                <form>
                    <div>
                        <img id="titulo" src={title}></img>
                        <img id="ball"  src={logo}></img>
                        <div id="btnlog">
                            <button className="waves-effect waves-light btn-small red" align= "right" id='btnlogout' onClick={(e)=>this.logout(e)}>Log out</button>
                        </div>
                    </div>
                    <Table></Table>
                </form>
            </div>
        )
    }
}
export default Pokemon;