import { useEffect, useState } from "react";
import { Accordion, Stack } from "react-bootstrap";

const ReceivedMessages = () => {
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [userMessages, setUserMessages] = useState([]);

  async function fetchUserMessages() {
    const url = import.meta.env.DEV
      ? import.meta.env.VITE_DEV_URL
      : import.meta.env.VITE_PROD_URL;
    const token = localStorage.getItem("token");

    setFetchingMessages(true);

    try {
      const response = await fetch(url + "/messages", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const result = await response.json();
      setUserMessages(result);
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingMessages(false);
    }
  }

  useEffect(() => {
    fetchUserMessages();
  }, []);

  return (
    <div className='mt-5'>
      <h2 className='fs-3'>Received Messages</h2>
      <ul></ul>

      <Stack gap={3}>
        {userMessages.map((message, index) => (
          <Accordion key={message._id} defaultActiveKey={`${index}`} alwaysOpen>
            <Accordion.Item eventKey={`${index}`}>
              <Accordion.Header>{message.title}</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </Stack>
    </div>
  );
};

export default ReceivedMessages;
