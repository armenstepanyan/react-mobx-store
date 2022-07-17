import React, { useState, useEffect } from "react";
import { useStore } from "stores";
import { observer } from "mobx-react";

function List() {
  const [id, setId] = useState("1");
  const { userStore } = useStore();

  useEffect(() => {
    userStore.loadUser(parseInt(id));
  }, [id]);

  const log = () => {
    console.log(userStore.currentUser);
  };

  return (
    <>
      
        <div>
          <h3>id: {id}</h3>
          <p>
            <select
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={{ width: "200px" }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </p>
          <p>
            <button onClick={log}>Log</button>
          </p>
          <div> User info { userStore.loading ? "Loading..." : userStore.currentUser?.name  }     </div>
          
        
         
        </div>
      
    </>
  );
}

export default observer(List);
