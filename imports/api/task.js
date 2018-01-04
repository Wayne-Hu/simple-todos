import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Tasks = new Mongo.Collection("tasks");

if (Meteor.isServer) {
  Meteor.publish("tasks", () => {
    return Tasks.find({ owner: Meteor.userId() });
  });
}

Meteor.methods({
  "tasks.insert"(text) {
    check(text.String);

    if (!this.userId) {
      throw new Meteor.Error("Unauthorized");
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
    });
  },

  "tasks.remove"(taskId) {
    check(taskId, String);

    const task = Tasks.findOne({ _id: taskId });
    if (task.owner === this.userId) {
      Tasks.remove(taskId);
    } else {
      throw new Meteor.Error("Unauthorized");
    }
  },

  "tasks.setChecked"(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: setChecked } });
  }
});
