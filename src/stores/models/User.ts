import { model, Model, tProp, types } from "mobx-keystone";

@model("app/User")
export class User extends Model({
  id: tProp(types.number),
  name: tProp(types.string),
  username: tProp(types.string),
  email: tProp(types.string)
}) { }
