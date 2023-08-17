import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import { useState } from "react";
import provider from "../provider";
import contactFactory from "../contactFactory";

const AddContact = () => {
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscrod] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!telegram) {
      setErrorMessage("Ну хоть телеграм то заполни");
    }
    const signer = await provider.getSigner();

    const contactFactoryWithSigner = contactFactory.connect(signer);

    try {
      let response;
      if (discord) {
        response = await contactFactoryWithSigner[
          "createContact(string,string)"
        ](telegram, discord);
      } else {
        response = await contactFactoryWithSigner["createContact(string)"](
          telegram
        );
      }

      console.log("response: ", response);
      setSuccessMessage("Хэш транзакции такой: " + response.hash);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Layout>
      <Form
        error={!!errorMessage}
        success={!!successMessage}
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Telegram"
            value={telegram}
            onChange={(event) => setTelegram(event.target.value)}
            placeholder="Введите здесь"
          />
          <Form.Field
            control={Input}
            label="Discord"
            value={discord}
            onChange={(event) => setDiscrod(event.target.value)}
            placeholder="Введите здесь "
          />
        </Form.Group>
        <Button primary>Сохранить</Button>
        <Message
          style={{ wordBreak: "break-word" }}
          error
          header="Ну что ж такоe!"
          content={errorMessage}
        />
        <Message success header="Успех!" content={successMessage} />
      </Form>
    </Layout>
  );
};

export default AddContact;
