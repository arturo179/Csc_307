import cors from "cors";
import express from "express";
import userServices from "./userServices.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());



app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userServices.getUsers(name, job)
    .then(users => res.send({ users_list: users }))
    .catch(err => res.status(500).send(err.message));
});
app.get("/users/:id/name", (req, res) => {
  const {id,name} = req.query;

  userServices.getUsersByIdandName(id,name)
    .then(users =>res.send({ users_list:users}))
    .catch(err => res.status(500).send(err.message));
});
// Find user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices.findUserById(id)
    .then(user => {
      if (!user) {
        return res.status(404).send("Resource not found.");
      }
      res.send(user);
    })
    .catch(err => res.status(500).send(err.message));
});

// Add a user
app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userServices.addUser(userToAdd)
    .then(addedUser => res.status(201).send(addedUser))
    .catch(err => res.status(500).send(err.message));
});


app.delete("/users/:id", (req, res) => {
  const userToDelete = req.params.id;

  userServices.deleteUserById(userToDelete)
    .then(result => {
      if (!result) {
        return res.status(404).send("Resource not found.");
      }
      res.status(204).send();
    })
    .catch(err => res.status(500).send(err.message));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
