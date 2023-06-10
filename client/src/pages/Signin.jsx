import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  async function authenticateUser() {
    try {
      const url = import.meta.env.DEV
        ? import.meta.env.VITE_DEV_URL
        : import.meta.env.VITE_PROD_URL;
      const response = await fetch(url + "/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
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
      navigateTo("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ maxWidth: "25rem" }} className='mx-auto'>
      <h1 className='text-center'>Sign in</h1>
      <Form className='mt-4' onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label htmlFor='nameInputId'>User name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
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
