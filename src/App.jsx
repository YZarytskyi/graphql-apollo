import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_USERS, GET_SELECTED_USERS } from "./query/user";
import { CREATE_USER } from "./mutations/user";
import "./App.css";

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data: selectedUser, loading: loadingUser} = useQuery(GET_SELECTED_USERS, {
    variables: {
      id: 1,
    }
  });
  const [newUser] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);


  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);


  const addUser = async (e) => {
    e.preventDefault()
    try {
      const response = await newUser({
        variables: {
          input: {
            username, age
          }
        }
      })
      setUsername('')
      setAge(0)
      return response.data.createUser
    } catch (error) {
      
    }
  }

  const getAll = (e) => {
    e.preventDefault();
    refetch()
  }

  return (
    <div className="App">
      <form>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        <input type="number" value={age} onChange={e => setAge(Number(e.target.value))}/>
        <div>
          <button onClick={addUser}>Create</button>
          <button onClick={getAll}>Get</button>
        </div>
      </form>
      <div>
        {!loading ? (
          users.map((user) => (
            <div key={user.id}>
              {user.username} {user.age}
            </div>
          ))
        ) : (
          <div> Loading...</div>
        )}
      </div>
    </div>
  );
}

export default App;
