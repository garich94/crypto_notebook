import { Form, Button, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import { useRef, useState } from "react";
import getContactByAddress from "../utils/getContactByAddress";

const ShowContact = () => {
  const [telegram, setTelegram] = useState();
  const [discord, setDiscrod] = useState();
  const [desc, setDesc] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const addressRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const address = addressRef.current.value;
    setTelegram("");
    setDiscrod("");
    setDesc("");
    setErrorMessage("");
    if (!address) {
      setErrorMessage("Адрес пользователя то нам нужен ...");
      return;
    }
    setIsLoading(true);
    try {
      const contact = await getContactByAddress(address);
      setTelegram(contact.telegram);
      setDiscrod(contact.discord);
      setDesc(contact.desc);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Form error={!!errorMessage} onSubmit={handleSubmit}>
        <Form.Field>
          <label>Введите адрес здесь</label>
          <input ref={addressRef} placeholder="Вот прям тут" />
        </Form.Field>
        <Button loading={isLoading} primary type="submit">
          Посмотреть
        </Button>
        <Message error header="Ну что ж такоe!" content={errorMessage} />
      </Form>
      {telegram && <h2>Telegram: {telegram}</h2>}
      {discord && <h2>Discord: {discord}</h2>}
      {desc && <h2>Desc: {desc}</h2>}
    </Layout>
  );
};

export default ShowContact;
