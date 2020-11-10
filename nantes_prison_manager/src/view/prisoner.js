import React from 'react';

// Retourne 1 prisonier
function ReactPrisoner(props){
    return(
      <tr id={props.index}>
        <td><input type="checkbox" onChange={props.onChange}></input></td>
        <td><p>{props.name}</p></td>
        <td><p>{props.firstname}</p></td>
        <td><p>{props.dob}</p></td>
        <td><p>{props.prison_time}</p></td>
        <td><p>{props.motive}</p></td>
        <td><button className="delete_button" onClick={props.onClick}>X</button></td>
      </tr>
    );
}

function objectsEquals(o1, o2){
    return(Object.keys(o1).length === Object.keys(o2).length 
              && Object.keys(o1).every(p => o1[p] === o2[p]));
}

export default class Prisoner extends React.Component{
    constructor(){
        super();
        this.state = {
            prisoners : [],
            prisoners_updated : false
        }
    }

    async componentDidMount(){
        if(!this.state.prisoners_updated){
            this.readPrisoner();
          }
    }

    async readPrisoner(){
        await fetch('/prisoners/read', {method: 'GET'}) // Envoi requete au serveur
              .then(res => res.json()) // Reponse de la requete
              .then((out) => { // Données a recuperer
                if(!objectsEquals(out, this.state.prisoners)){
                  this.setState({prisoners: out.result, prisoners_updated: true});
                }
              });
    }

    async addPrisoner(){
        if(document.getElementById("add_name").value !== ''){
          let new_name = document.getElementById("add_name").value;
          if(typeof new_name == 'string'){
            await fetch('/prisoners/create', 
            {
              method:'POST',
              headers:{"Content-Type": "application/json"}, 
              body:JSON.stringify({name:new_name}) 
            })
            .then((res) => {
                this.readPrisoner();
              }
            );
          }
        }
        else{
          console.log('clic addPrisoner');
        }
    }

    async updatePrisoner(i){
        let row = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i];
        let checkbox = row.children[0].children[0];
        if(checkbox.checked){
            console.log('modification');
        }
        else console.log('envoi de la modification au serveur')
    }

    // Rendu quand clic sur le bouton Prisoniers
    render(){
        let prisoners_array = [];
        this.state.prisoners.forEach((elt, i) => {
            prisoners_array.push(<ReactPrisoner index = {i} key = {i} onChange={() => this.updatePrisoner(i)} name = {elt.name} firstname = "x" dob = "xx/xx/xxxx" prison_time = "xx days" motive = "x" onClick = {() => console.log(i)} />);
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Modif.</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Date Naissance</th>
                        <th>Temps prison.</th>
                        <th>Motif</th>
                        <th>Suppr.</th>
                    </tr>
                </thead>
                <tbody>
                    {prisoners_array}
                    <tr id="add">
                        <td>+</td>
                        <td><input id="add_name" type="text" placeholder="Nom"></input></td>
                        <td><input id="add_firstname" type="text" placeholder="Prenom"></input></td>
                        <td><input id="add_dob" type="text" placeholder="xx/xx/xxxx"></input></td>
                        <td><input id="add_prison_time" type="text" placeholder="xx"></input> days</td>
                        <td><input id="add_motive" type="text" placeholder="motive"></input></td>
                        <td><button onClick={() => this.addPrisoner()}>Ajouter</button></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}