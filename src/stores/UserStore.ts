import { computed } from "mobx";

import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  asMap,
  prop,
  modelAction,
} from "mobx-keystone";


import { User } from "./models";
import { UserData } from '../types';

async function load(userId: number){
    var resp = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    var user = await resp.json();
    return user as UserData
}

async function loadList(){
  var resp = await fetch('https://jsonplaceholder.typicode.com/users');
  var list = await resp.json();
  return list as Array<UserData>
}


@model("app/UserStore")
export default class UserStore extends Model({
  currentId: prop<number | null>(1),
  userArrayMap: prop<[string, User][]>(() => []),
  loading: prop<boolean>(true).withSetter(),
  currentUser: prop<User | null>(null).withSetter()
}) {

  onAttachedToRootStore() {
   this.setUser({ id: 1, name: 'Armen', email: 'a@gmail.com', username: 'admin' });
  }


  @modelFlow
  loadUser = _async(function* (this: UserStore, id: number) {
    this.setLoading(true);
    const user = yield* _await(load(id));
    this.setLoading(false);
    this.setUser(user as User);
  });


  @modelFlow
  loadUserList = _async(function* (this: UserStore) {
    const users = yield* _await(loadList());
    this.setUserList(users);
  });
  
  get userMap() {
    return asMap(this.userArrayMap);
  }

  @computed
  get users() {
    const arr = this.userArrayMap.map((i) => i[1]);
    return arr;
  }

  
  @computed
  get current() {
    const { currentId } = this;
    return currentId ? this.userMap.get(currentId.toString()) : null;
  }

 
  @modelAction
  setUser(this: UserStore, userInfo: UserData) {
    const currentUser = new User(userInfo);
    this.setCurrentUser(currentUser)
    return currentUser;
  }

  @modelAction
  setCurrentUserId(this: UserStore, id: number){
    this.currentId = id;
  }

  @modelAction
  setUserList(this: UserStore, users: Array<UserData>){
    users.forEach(user => {
      this.userMap.set(`${user.id}`, new User(user));
    })   
    
  }

}
