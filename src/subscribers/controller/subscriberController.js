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
      console.error("controller {subcribe}:", error.message);
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
      console.error("controller {get subscriber}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async unSubscribe(req, res) {
    try {
      const { id } = req.params;
      const subscriber = await this.service.unSubscribeService(id);
      return res.status(201).json({ message: true, data: subscriber });
    } catch (error) {
      console.error("controller {unsubscribe}:", error.message);
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
      console.error("controller {notifySubscribers}:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default SubscriberController;
