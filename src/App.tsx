import styles from "./App.module.css";
import MessageList from "./UI/MessageList/MessageList";
import SubmitForm from "./UI/SubmitForm/SummitForm";
import PageTitle from "./UI/Title/PageTitle";

function App() {
  return (
    <div className={styles.container}>
      <PageTitle></PageTitle>
      <MessageList
        messages={[
          { name: "from:", text: "Hello, how are you?", date: Date.now() },
          { name: "from:", text: "Hello, how are you?", date: Date.now() },
        ]}
      ></MessageList>
      <SubmitForm></SubmitForm>
    </div>
  );
}

export default App;
