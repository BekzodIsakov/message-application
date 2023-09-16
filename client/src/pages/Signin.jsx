import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/Provider";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useUserContext();

  const navigateTo = useNavigate();

  async function authenticateUser() {
    try {
      const url = import.meta.env.VITE_URL;
      const response = await fetch(url + "/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
        }),
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await authenticateUser();

      if (!response.ok) throw new Error();

      const result = await response.json();
      localStorage.setItem("token", result.token);
      setUserName(result.user.name);
      navigateTo("/");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigateTo("/");
  });

  return (
    <div style={{ maxWidth: "25rem" }} className='mx-auto'>
      <h1 className='text-center'>Sign in</h1>
      <Form className='mt-4' onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label htmlFor='nameInputId'>User name</Form.Label>
          <Form.Control
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='Enter your name'
            id={"nameInputId"}
            autoFocus
            required
          />
        </Form.Group>
        <Button
          type='submit'
          className='mt-4 w-100'
          size='sm'
          disabled={loading}
        >
          {loading ? "Processing..." : "SIGN IN"}
        </Button>
      </Form>
    </div>
  );
};

export default Signin;
