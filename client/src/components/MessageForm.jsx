import { useEffect, useState } from "react";
import { Form, Col, Row, Button, ToastContainer, Toast } from "react-bootstrap";
import AutocompleteInput from "./AutocompleteInput";

const MessageForm = () => {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [toastType, setToastType] = useState("");

  const token = localStorage.getItem("token");

  const url = import.meta.env.VITE_URL;

  async function fetchRecipients() {
    const response = await fetch(url + "/users", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const users = await response.json();
    const _recipients = users.map((user) => ({
      name: user.name,
      id: user._id,
    }));
    setRecipients(_recipients);
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
        recipient: selectedRecipient,
      }),
    });
    return response;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    console.log({
      title,
      message,
      recipient: selectedRecipient,
    });
    setSendingMessage(true);
    try {
      const response = await sendMessage();
      await response.json();
      if (response.ok) {
        setToastType("success");
        setTitle("");
        setMessage("");
        setSelectedRecipient("");
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
      <header className='bg-secondary py-3 px-3'>
        <h2 className='fs-6 mb-0 text-light'>Send a message</h2>
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
            <AutocompleteInput
              options={recipients.map((recipient) => ({
                label: recipient.name,
              }))}
              selected={selectedRecipient}
              onSelect={(selectedValue) => setSelectedRecipient(selectedValue)}
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

export default MessageForm;
