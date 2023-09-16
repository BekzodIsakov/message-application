import { useEffect, useState } from "react";
import { Accordion, Stack } from "react-bootstrap";

const ReceivedMessages = () => {
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [userMessages, setUserMessages] = useState([]);

  const token = localStorage.getItem("token");
  async function handleFetchMessages() {
    setFetchingMessages(true);
    try {
      const response = await fetchUserMessages();
      const result = await response.json();
      setUserMessages(result);
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingMessages(false);
    }
  }

  async function fetchUserMessages() {
    const url = import.meta.env.VITE_URL;

    try {
      const response = await fetch(url + "/messages", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleFetchMessages();
    const intervalId = setInterval(() => {
      fetchUserMessages()
        .then((response) => response.json())
        .then((result) => setUserMessages(result));
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='mt-5'>
      <h2 className='fs-3 text-dark mb-3'>Received Messages</h2>
      <Stack gap={3}>
        {fetchingMessages ? (
          "Fetching messages..."
        ) : userMessages.length ? (
          userMessages.map((message, index) => (
            <Accordion
              key={message._id}
              defaultActiveKey={`${index}`}
              alwaysOpen
            >
              <Accordion.Item eventKey={`${index}`}>
                <Accordion.Header>{message.title}</Accordion.Header>
                <Accordion.Body>{message.message}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))
        ) : (
          <div className='text-secondary'>You have no received message!</div>
        )}
      </Stack>
    </div>
  );
};

export default ReceivedMessages;
