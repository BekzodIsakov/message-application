import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Signin = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <div style={{ maxWidth: "25rem" }} className='mx-auto'>
      <h1 className="text-center">Sign in</h1>
      <Form className='mt-4' onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label htmlFor="nameInputId">User name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
            id={'nameInputId'}
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
