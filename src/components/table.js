import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import'../App.css';
import axios from "axios";
import M from "materialize-css";
import logo from '../assets/pokebola.png';
import title from '../assets/title.png';

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon:[],
            url:'',
            detail:[],
            effect:[]
        }
    }
    componentDidMount(){
        this.PokemonFunction();

        const options = {
            onOpenStart: () => {
              axios.get(this.state.url)
                .then(res =>{
                    const detail = res.data.abilities;
                    this.setState({detail});
                })
            },
            
        };
        M.Modal.init(this.Modal, options);
    }
    
    PokemonFunction(){
        axios.get('https://pokeapi.co/api/v2/pokemon')
        .then(res =>{
            const pokemon = res.data.results;
            this.setState({pokemon});
        })
    }

    openmodal(e, url){
        this.setState({url:url});
    }

    collapseEffects(e, url, key){
        this.setState({open:!this.state.open, keycollapse: key});
        axios.get(url)
        .then(res =>{
            const effect = res.data.effect_entries;
            this.setState({effect});
        })
      
    }
    render() {
        return (
            <React.Fragment>
            <table id="myTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Abilitis</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        (()=>{
                            if (this.state.pokemon === []) {
                                return '';
                            }else{
                                return(
                                    this.state.pokemon.map((item, key) =>{
                                        console.log();
                                        return(
                                            <tr key={key}>
                                                <td>{item.name}</td>{/* 
                                                <td><Modal url={item.url}></Modal></td> */}
                                                <td><button onClick={(e)=>this.openmodal(e, item.url)} className="btn-floating btn-small waves-effect waves-light modal-trigger" href="#modal2"><i className="material-icons">menu</i></button></td>
                                            </tr>
                                        )
                                    }
                                    )
                                );
                            }
                        })
                        ()
                    }
                </tbody>
            </table>
            
        <div ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal2"
          className="modal"><div
        >
          <div className="modal-content">
                        <img id="titulo" src={title}></img>
                        <img id="ball" src={logo}></img>
              <table >
                  <thead>
                  <tr>
                    <th>Abilities</th>
                    <th>Effects</th>
                  </tr>
                  </thead>
                  {
                      (()=>{
                          if (this.state.detail === undefined) {
                              return '';
                          }else{
                              return(
                                this.state.detail.map((item, key) =>{
                                    return (
                                        <tr key={key}> 
                                            <td>{item.ability.name}</td>
                                            <td>
                                            <div className="panel-group">
                                                <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                    <a onClick={(e)=>this.collapseEffects(e, item.ability.url, key)} className="btn-floating btn-small waves-effect waves-light"><i className="material-icons">pageview</i></a>
                                                    </h4>
                                                </div>
                                                
                                                <div className={this.state.open && this.state.keycollapse === key ? "panel-collapse": "panel-collapse panel-close"}>
                                                                                                    
                                                <ul className="list-group">
                                                        {
                                                                        this.state.effect.map((i,keys)=>{
                                                                          return(
                                                                            <React.Fragment>
                                                                              <li className="list-group-item">{i.effect}</li>
                                                                              <div className="dividerpkm"></div>
                                                                            </React.Fragment>
                                                                          );
                                                                        })                                                               
                                                        }
                                                        </ul>
                                                </div>
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                    );
                                
                                }
                                )
                              );
                          }
                      })
                        ()
                    }
              </table>
          </div>
          <div className="modal-footer">
            <a className="modal-close waves-effect waves-green btn-flat">
              Close
            </a>
          </div>
        </div>
        </div>
                        
            </React.Fragment>
        )
    }
}
export default Table;