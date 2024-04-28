import { validationResult } from "express-validator";

class SubscriberController {
  constructor(subscriberService) {
    this.service = subscriberService;
  }

  async createSubscriber(req, res) {
    const { email } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const subscriber = await this.service.createSubscriberService(email);
      return res
        .status(201)
        .json(
          subscriber.error
            ? { message: subscriber.error }
            : { message: "Successfully Subscribed" }
        );
    } catch (error) {
      console.error("subscribe {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readSubcriber(req, res) {
    try {
      const subscriber = await this.service.readSubscriberService();
      return res
        .status(201)
        .json({ message: "Successfully Retrieved", data: subscriber });
    } catch (error) {
      console.error("read subscribers {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async unSubscribe(req, res) {
    const { email } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await this.service.unSubscribeService(email);
      return res.status(201).json({ message: true });
    } catch (error) {
      console.error("unsubscribe {controller}:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async notifySubscribers(req, res) {
    try {
      const { subject, message } = req.body;
      const subscriber = await this.service.notifySubscribersService({
        subject,
        message,
      });
      if (subscriber.sent) {
        return res.status(201).json({ message: "Mail Delivered" });
      } else {
        return res.status(200).json({ message: "Mail Not Sent" });
      }
    } catch (error) {
      console.error("notify subscribers {controller}:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readMessages(req, res) {
    try {
      const message = await this.service.readMessages();
      return res.status(201).json({ message: true, data: message });
    } catch (error) {
      console.error("read messages {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteMessages(req, res) {
    try {
      await this.service.deleteMessageService();
      return res.status(201).json({ message: "Successfully Deleted" });
    } catch (error) {
      console.error("delete message {controller}:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default SubscriberController;
