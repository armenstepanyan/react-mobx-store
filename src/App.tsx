import "./App.css";
import { observer } from "mobx-react";
import List from "List";
import Table from "Table";

function App() {

  return (
    <div className="App">
      <List />        
      <Table />  
    </div>
  );
}

export default observer(App);
