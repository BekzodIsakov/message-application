import { useEffect, useState } from "react";
import { Stack, Spinner } from "react-bootstrap";

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
      <div
        direction='horizontal'
        className='d-flex align-items-center mb-3 gap-3'
      >
        <h2 className='fs-3 text-dark'>Received Messages</h2>
        {fetchingMessages && <Spinner variant='primary' />}
      </div>
      <Stack gap={"3"}>
        {userMessages.length ? (
          userMessages.map((message, index) => (
            <Stack key={index} gap='1' className='bg-light p-4 py-3 rounded-3'>
              <div>
                From: <span className='fw-semibold'>{message.sender}</span>
              </div>
              <div>
                Title: <span className='fw-semibold'>{message.title}</span>
              </div>
              <div>
                Message: <span className='fw-semibold'>{message.message}</span>
              </div>
            </Stack>
            // <Accordion
            //   key={message._id}
            //   defaultActiveKey={`${index}`}
            //   alwaysOpen
            // >
            //   <Accordion.Item eventKey={`${index}`}>
            //     <Accordion.Header>{message.title}</Accordion.Header>
            //     <Accordion.Body>{message.message}</Accordion.Body>
            //   </Accordion.Item>
            // </Accordion>
          ))
        ) : (
          <div className='text-secondary'>No received message!</div>
        )}
      </Stack>
    </div>
  );
};

export default ReceivedMessages;
