import ReceivedMessages from "../components/ReceivedMessages";
import MessageForm from "../components/MessageForm";

const Dashboard = () => {
  return (
    <div>
      <MessageForm />
      <ReceivedMessages />
    </div>
  );
};

export default Dashboard;
