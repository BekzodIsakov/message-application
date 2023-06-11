import { useEffect, useState } from "react";
import { Form, Col, Row, Button, ToastContainer, Toast } from "react-bootstrap";
import Select from "react-select";
import Autocomplete from "react-autocomplete";
import getUrl from "../utils/getUrl";
import AutocompleteInput from "./AutocompleteInput";

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

const MessageForm = () => {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [fetchingRecipients, setFetchingRecipients] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [toastType, setToastType] = useState("");

  console.log(selectedRecipient);

  const url = getUrl();
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
      recipient: selectedRecipient.value,
    });
    // setSendingMessage(true);
    // try {
    //   const response = await sendMessage();
    //   await response.json();
    //   if (response.ok) {
    //     setToastType("success");
    //     setTitle("");
    //     setMessage("");
    //     setSelectedRecipient(null);
    //   } else throw new Error();
    // } catch (error) {
    //   console.error(error);
    //   setToastType("danger");
    // } finally {
    //   setSendingMessage(false);
    // }
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
              options={[{ label: "Bekzod" }, { label: "Ben" }]}
              onSelect={(selectedValue) => setSelectedRecipient(selectedValue)}
            />
          </Col>
          {/* <Col sm={10}>
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
              // onInputChange={(value) => {
              //   if (value) setSelectedRecipient(value);
              // }}
              onInputChange={(value) => {
                if (!recipients.includes(value)) {
                  const _recipients = [...recipients, { label: value, value }];
                  setRecipients(_recipients);
                }
              }}
              required
            />
          </Col> */}

          {/* <Col sm={10}>
            <div className='App' style={{ padding: "20px" }}>
              <Autocomplete
                wrapperStyle={{ position: "relative" }}
                menuStyle={{
                  borderRadius: "6px",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                  background: "rgba(255, 255, 255, 0.9)",
                  padding: "2px 0",
                  fontSize: "90%",
                  overflow: "auto",
                  position: "absolute",
                  top: "110%",
                  left: 0,
                  paddingBlock: "3px",
                  border: "solid 1.25px rgb(222, 226, 230)",
                }}
                inputProps={{
                  style: {},
                  className: "form-control",
                }}
                getItemValue={(item) => item.label}
                items={[{ label: "apple" }, { label: "banana" }]}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item.label}
                    style={{
                      background: isHighlighted
                        ? "rgba(13,110,253,.25)"
                        : "white",
                      textAlign: "left",
                      paddingInline: "5px",
                      paddingBlock: "5px",
                    }}
                  >
                    {item.label}
                  </div>
                )}
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                onSelect={(val) => setSelectedRecipient(val)}
              />
            </div>
          </Col> */}
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
