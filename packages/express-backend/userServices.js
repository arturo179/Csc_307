import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}
function getUsersByIdandName(id,name)
{
  let promise;
  if (id && name) {
    promise = findUserByIdAndName(id, name); // Ensure this function exists
  } else if (name === undefined && id === undefined) {
    promise = userModel.find(); // Get all users
  } else if (name && !id) {
    promise = findUserByName(name); // Find by name
  } else if (id && !name) {
    promise = findUserById(id); // Find by id
  }

  return promise;
}


function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}
function findUserByIdAndName(id, name) {
  return userModel.findOne({ _id: id, name: name }); 
}
function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}
export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
  getUsersByIdandName
};