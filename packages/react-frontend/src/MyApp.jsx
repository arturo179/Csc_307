// src/MyApp.jsx
import React,{ useState,useEffect } from 'react';
import Table from "./Table";
import Form from"./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  
  function removeOneCharacter(index) {
    const userToDelete = characters[index];
    if(!userToDelete) return;
    fetch(`http://localhost:8000/users/${userToDelete.id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response)=> {
      if(response.ok){


        const updatedCharacters = characters.filter((_,i) => i !== index);
        setCharacters(updatedCharacters);
        
      }else{
        throw new Error(404)
      }
    })
    .catch((error) => {
      console.log(error);
    });
    // const updated = characters.filter((character, i) => {
    //   return i !== index;
    // });
    // setCharacters(updated);
  }
    
  
    
  
  function updateList(person) {
    postUser(person)
    .then((response) =>{
      if(response.status ===201){
        return response.json();
      } else{
        throw new Error('Failed to create')
      }
    })

    .then((newUser) => setCharacters([...characters, newUser]))
    .catch((error) => {
      console.log(error);
    });
  }
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}
useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
  
}, [] );
function postUser(person) {
  const promise = fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),

  });

  return promise;
}
  return (
    <div className="container">
      <Table 
      characterData={characters}
      removeCharacter={removeOneCharacter}
       />
      <Form handleSubmit={updateList} />
    </div>
  );
  
  
}

export default MyApp;