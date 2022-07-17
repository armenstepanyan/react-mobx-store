import React, { useEffect } from "react";
import { useStore } from "stores";
import { observer } from "mobx-react";

function Table() {
  const { userStore } = useStore();

  useEffect(() => {
    userStore.loadUserList();
  }, [userStore.loadUserList]);

  const edit = (id: number) => {    
    userStore.setCurrentUserId(id);
    console.log(userStore.current)
  }

  return (
    <>
      {userStore.users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>User list</h3>
          <h4>Current user {userStore.current?.name}</h4>
          <hr />
          <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>#</th>
                </tr>
            </thead>
            <tbody>
            {
                userStore.users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => edit(user.id)}>Edit</button>
                    </td>
                    </tr>
                ))
            }
            </tbody>
            
          </table>
        </div>
      )}
    </>
  );
}

export default observer(Table);
