import GoogleLogin from 'react-google-login';
import './App.css';
import { gapi } from "gapi-script";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [userData, setUserData] = useState()
  useEffect(()=>{
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId:
          "668363364374-s3b9e48iu5r1k5p9t66mcjm2g0mjio5u.apps.googleusercontent.com",
        plugin_name: "simple",
      });
    });
  }, [])

  const responseSuccessGoogle = async(response)=>{
    // console.log(response)
    //
    const data = await axios.post("http://localhost:5000/user/google-auth", {tokenId: response.tokenId})
    setUserData(data.data)
  }

  const responseErrorGoogle =(error)=>{
    console.log(error)
  }

  return (
    <div className="App">
      <h1>Google Authentication</h1>
      <GoogleLogin
        clientId="668363364374-s3b9e48iu5r1k5p9t66mcjm2g0mjio5u.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <div>
        {
          userData && <div>
            <h1>User Info After Google Login</h1>
            <p>Name: {userData.name}</p>
            <p>Name: {userData.email}</p>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
