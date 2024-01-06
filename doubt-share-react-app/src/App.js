import './App.css';
// import io from "socket.io-client";
import { useEffect } from "react";


import AllRoutes from './components/pages/AllRoutes';
// import io from "socket.io-client";
// const socket = io("http://localhost:3300");

function App() {

  // useEffect(() => {
  //   socket.emit("message", { message: "Hellooo" });

  // }, []);

  return (

    <div className="App">
      <AllRoutes />
    </div>

  );
}

export default App;
