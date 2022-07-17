import { Model, model, prop } from "mobx-keystone";


import UserStore from "./UserStore";

@model("app/RootStore")
export default class RootStore extends Model({
  userStore: prop<UserStore>(),
}) {}