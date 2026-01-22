import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [users, setUsers] = useState<any[]>([]);

  const onGetUsers = async() => {
    try {
      const res = await axios.get('http://localhost:8000/api/users')
      setUsers(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const onCreateUser = async() => {
    try {
      await axios.post('http://localhost:8000/api/users', {
        email: '', 
        fullName: '', 
        username: '', 
        role: 'USER'
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    onGetUsers();
  }, [])

  return(
    <>
      {users?.map((user: any, index) => {
        return(
          <div key={index}>
            {user?.fullName}
          </div>
        )
      })}
    </>
  );
}

export default App;



/*
  Buat simple app untuk CRUD Product (FE & BE)
  - Lakukan soft delete untuk delete product
*/