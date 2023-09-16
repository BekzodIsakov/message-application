import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ReceivedMessages from "../components/ReceivedMessages";
import MessageForm from "../components/MessageForm";
import { useUserContext } from "../context/Provider";

const Dashboard = () => {
  const [signOutLoading, setSignoutLoading] = useState(false);

  const [userName] = useUserContext();

  const navigateTo = useNavigate();

  async function signOutUser() {
    const url = import.meta.env.VITE_URL;
    const token = localStorage.getItem("token");

    const response = await fetch(url + "/signout", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  async function handleSignOutButton() {
    setSignoutLoading(true);
    try {
      const response = await signOutUser();
      if (!response.ok) throw new Error();
      localStorage.clear();
      return navigateTo("/signin");
    } catch (error) {
      console.error(error);
    } finally {
      setSignoutLoading(false);
    }
  }

  return (
    <div>
      <div className='d-flex justify-content-between mb-3'>
        <h1>{userName}</h1>
        <div>
          <Button
            variant='outline-danger'
            disabled={signOutLoading}
            onClick={handleSignOutButton}
          >
            {signOutLoading ? "Processing..." : "Sign out"}
          </Button>
        </div>
      </div>
      <MessageForm />
      <ReceivedMessages />
    </div>
  );
};

export default Dashboard;
