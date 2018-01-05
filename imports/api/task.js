import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const Tasks = new Mongo.Collection("tasks");

if (Meteor.isServer) {
  Meteor.publish("tasks", () => {
    return Tasks.find({ owner: Meteor.userId() });
  });
}

export const insertTask = new ValidatedMethod({
  name: "tasks.insert",
  validate: new SimpleSchema({
    text: { type: String }
  }).validator(),
  run({ text }) {
    if (!this.userId) {
      throw new Meteor.Error("Unauthorized");
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
    });
  }
});

export const removeTask = new ValidatedMethod({
  name: "tasks.remove",
  validate: new SimpleSchema({
    taskId: { type: String }
  }).validator(),
  run({ taskId }) {
    const task = Tasks.findOne({ _id: taskId });
    if (task.owner === this.userId) {
      Tasks.remove(taskId);
    } else {
      throw new Meteor.Error("Unauthorized");
    }
  }
});

export const setChecked = new ValidatedMethod({
  name: "tasks.setChecked",
  validate: new SimpleSchema({
    taskId: { type: String },
    checked: { type: Boolean }
  }).validator(),
  run({ taskId, checked }) {
    Tasks.update(taskId, { $set: { checked } });
  }
});
