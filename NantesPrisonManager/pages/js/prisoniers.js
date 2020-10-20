window.onload = () => {
  document.getElementById("read_db").onclick = () => {
    fetch('/show_data', {method: 'GET'}) // Envoi requete au serveur
    .then(res => res.json()) // Reponse de la requete
    .then((out) => { // Données a recuperer
      console.log(out.result);
      document.getElementById("result").innerHTML = printArrayToList(out.result);
    })
  }
}


function printArrayToList(array){
  let string = "<ul>";
  for(let i=0; i<array.length; i++){
    string += '<li>Nom : ' + array[i].name + '</li>';
  }
  string += "</ul>"
  return string;
}
