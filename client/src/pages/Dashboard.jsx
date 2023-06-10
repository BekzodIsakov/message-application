import { useEffect, useState } from "react";
import { Form, Col, Row, Button, ToastContainer, Toast } from "react-bootstrap";
import Select from "react-select";

const customStyles = {
  control: (styles) => ({
    ...styles,
    borderRadius: "6px",
    borderColor: "#dee2e6",
    ":hover": {
      borderColor: "#c1c7cd",
    },
    ":focus-within": {
      ...styles[":focus-within"],
      boxShadow: "0 0 0 0.25rem rgba(13,110,253, .25)",
      borderColor: "#86b7fe",
    },
  }),
  menuList: (styles) => ({
    ...styles,
    borderRadius: "6px",
  }),
};

const Dashboard = () => {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [fetchingRecipients, setFetchingRecipients] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [toastType, setToastType] = useState("");

  const url = import.meta.env.DEV
    ? import.meta.env.VITE_DEV_URL
    : import.meta.env.VITE_PROD_URL;
  const token = localStorage.getItem("token");

  async function fetchRecipients() {
    setFetchingRecipients(true);
    const response = await fetch(url + "/users", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const users = await response.json();
    const _recipients = users.map((user) => ({
      label: user.name,
      value: user._id,
    }));
    setRecipients(_recipients);
    setFetchingRecipients(false);
  }

  async function sendMessage() {
    const response = fetch(url + "/message", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        message,
        recipient: selectedRecipient.value,
      }),
    });
    return response;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    console.log({
      title,
      message,
      recipient: undefined,
    });
    setSendingMessage(true);
    try {
      const response = await sendMessage();
      const result = await response.json();
      if (response.ok) {
        setToastType("success");
        setTitle("");
        setMessage("");
        setSelectedRecipient(null);
      } else throw new Error();
    } catch (error) {
      console.error(error);
      setToastType("danger");
    } finally {
      setSendingMessage(false);
    }
  }

  useEffect(() => {
    fetchRecipients();
  }, []);
  return (
    <div className='rounded-2 overflow-hidden'>
      <header className='bg-secondary py-2 px-3'>
        <h2 className='fs-6 mb-0 text-light'>New message</h2>
      </header>

      <Form className='bg-body-secondary px-3 py-3' onSubmit={handleFormSubmit}>
        <Form.Group
          as={Row}
          className='mb-3'
          controlId='formHorizontalPassword'
        >
          <Form.Label column sm={2}>
            Recipient
          </Form.Label>
          <Col sm={10}>
            <Select
              // className='basic-single'
              classNamePrefix='select'
              defaultValue={""}
              isClearable={true}
              isSearchable={true}
              isLoading={fetchingRecipients}
              name='recipient'
              options={recipients}
              styles={customStyles}
              value={selectedRecipient}
              onChange={(recipient) => setSelectedRecipient(recipient)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={2}>
            Message
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              rows={3}
              required
              as='textarea'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type='submit' disabled={sendingMessage}>
              {sendingMessage ? "Sending..." : "Send"}
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <ToastContainer
        className='p-3'
        position={"bottom-end"}
        style={{ zIndex: 1 }}
      >
        <Toast
          bg={toastType}
          show={Boolean(toastType)}
          onClose={() => setToastType("")}
          autohide
          delay={3000}
        >
          <Toast.Header closeButton={true}>
            <div className='me-auto'></div>
          </Toast.Header>
          <Toast.Body className='text-light fs-6'>
            {toastType == "success" ? " Message sent!" : "Message not sent!"}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Dashboard;
