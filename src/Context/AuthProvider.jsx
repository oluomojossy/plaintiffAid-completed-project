import { useState } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("userToken")
  const [isAuthenticated, setIsAuthenticated] = useState(token);
  const [clients, setClients] = useState()
  const id = JSON.parse(localStorage.getItem("user"))?.UserID;

  const getClientInformation = async () => {
    try {
      const res = await axios.get(
        `https://plaintiff-backend.onrender.com/api_v1/getClients/${id}`
      );
      if (res?.data && res?.data?.data && Array.isArray(res?.data?.data)) {
        setClients(res.data.data);
        const clientData = res?.data?.data.map((item) => {
          return { CaseID: item.CaseID, ClientID: item.ClientID };
        });
        localStorage.setItem("clients", JSON.stringify(clientData));
      } else {
        console.error("Invalid response structure");
      }
    } catch (err) {
      console.error("Error fetching client information:", err);
    }
  };

  // Implement login/logout logic here, updating isAuthenticated

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, getClientInformation, clients }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;