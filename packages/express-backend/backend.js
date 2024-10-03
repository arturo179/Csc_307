// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

//   app.get("/users", (req, res) => {
//     res.send(users);
//   });
const findUserByNameAndJob = (name, job) => {
    return users.users_list.filter((user) => 
        user.name.toLowerCase() === name.toLowerCase() && user.job.toLowerCase() === job.toLowerCase()
    );
};
  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
      let result = findUserByNameAndJob(name,job);
      result= {users_list: result};
      res.send(result);
    } else {
      res.send(users);
    }
  });

  const findUserById = (id) =>{
    users["users_list"].find((user) => user["id"] === id);
    return id;
  };  
  
  app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });
  
  
    
    
    
  const addUser = (user) =>{
    users["users_list"].push(user);
    return user;

  };
  const deleteUser = (id) => {
    const userIndex = users["users_list"].findIndex((user) => user["id"] === id);
    
    users["users_list"].splice(userIndex, 1);
    return id; 
};

app.delete("/users/:id", (req, res) => {
    const userToDelete = req.params.id; // Get the ID from the URL params
    let result = deleteUser(userToDelete);
    
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(); 
    }
}); 
        
        
        
    
  app.post("/users", (req, res)=> {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
  });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
