import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ReceivedMessages from "../components/ReceivedMessages";
import MessageForm from "../components/MessageForm";

const Dashboard = () => {
  const [signingOut, setSigningOut] = useState(false);

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
    setSigningOut(true);
    try {
      const response = await signOutUser();
      if (!response.ok) throw new Error();
      localStorage.removeItem("token");
      return navigateTo("/signin");
    } catch (error) {
      console.error(error);
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div>
      <div className='text-end'>
        <Button
          variant='light mb-3'
          disabled={signingOut}
          onClick={handleSignOutButton}
        >
          {signingOut ? "Processing" : "Sign out"}
        </Button>
      </div>
      <MessageForm />
      <ReceivedMessages />
    </div>
  );
};

export default Dashboard;
