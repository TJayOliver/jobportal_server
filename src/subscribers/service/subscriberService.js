import { sendMail } from "../../../mail/sendMail.js";
import { nanoid } from "nanoid";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL;

const subscriptionMail =
  "D:/Web/Projects/Job Portal/Server/mail/template/subscribeTemplate.html";
const subscribeMessage = fs.readFileSync(subscriptionMail);

class SubscriberService {
  constructor(database) {
    this.database = database;
  }

  async createSubscriberService(Email) {
    try {
      const checkEmail = await this.database.checkSubscriber(Email);
      if (checkEmail.length > 0) {
        return { error: "Already a Subscriber. Thank You" };
      } else {
        const email = Email;
        const subscriberDetails = [nanoid(), email];
        const subscriber = await this.database.createSubscriber(
          subscriberDetails
        );
        const receiverID = subscriberDetails[0];
        const receiverEmail = subscriberDetails[1];
        const unSubscribeLink = `<a href='http://${CLIENT_URL}/unsubscribe/${receiverID}'>Click to Unsubscribe</a>`;
        const htmlContent = `${subscribeMessage} ${unSubscribeLink}`;
        await sendMail(
          receiverEmail,
          "Empowering Your Journey: Exclusive Job Opportunities, Scholarships, and Career Guidance Await You!",
          htmlContent
        );
        return subscriber;
      }
    } catch (error) {
      console.error("service {subscribe}:", error.message);
    }
  }

  async readSubscriberService() {
    try {
      const subscriber = await this.database.readSubscriber();
      return subscriber;
    } catch (error) {
      console.error("service {read subscriber}:", error.message);
    }
  }

  async unSubscribeService(id) {
    try {
      const subscriber = await this.database.unSubscribe(id);
      return subscriber;
    } catch (error) {
      console.error("service {unsubscribe}:", error.message);
    }
  }

  async notifySubscribersService({ subject, message }) {
    try {
      const receipients = await this.database.readSubscriber();
      const response = await sendMail(receipients, subject, message);
      console.log("here", response);
      await this.database.notifySubscribers({
        id: nanoid(),
        subject: response.subject,
        receiver: response.receiver,
        messageId: response.messageId,
      });
      if (response.sent) {
        return { sent: true };
      } else {
        return { sent: false };
      }
    } catch (error) {
      console.error("service {notifySubscribers}:", error.message);
      return { sent: false };
    }
  }
}

export default SubscriberService;
