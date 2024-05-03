import {
  mailMessagesModel,
  subscribersModel,
} from "../../../schema/mongoSchema.js";

class SubscriberDatabase {
  async createSubscriber(subsciberDetails) {
    try {
      const subscriber = await subscribersModel.create(subsciberDetails);
      return subscriber;
    } catch (error) {
      throw error;
    }
  }

  async readSubscriber() {
    try {
      const subscriber = await subscribersModel.find();
      return subscriber;
    } catch (error) {
      throw error;
    }
  }

  async readSubscriberEmail() {
    try {
      const subscriber = await subscribersModel.find().select({ email: 1 });
      return subscriber;
    } catch (error) {
      throw error;
    }
  }

  async checkSubscriber(email) {
    try {
      const subscriber = await subscribersModel.find({ email: email });
      return subscriber;
    } catch (error) {
      throw error;
    }
  }

  async unSubscribe(email) {
    try {
      const subscriber = await subscribersModel.deleteOne({ email: email });
      return subscriber;
    } catch (error) {
      throw error;
    }
  }

  async notifySubscribers(details) {
    try {
      const subscriber = await mailMessagesModel.create(details);
      return subscriber;
    } catch (error) {
      throw error;
    }
  }

  async readMessages() {
    try {
      const message = await mailMessagesModel.find();
      return message;
    } catch (error) {
      throw error;
    }
  }

  async deleteMessages() {
    try {
      const message = await mailMessagesModel.deleteMany({});
      return message;
    } catch (error) {
      throw error;
    }
  }
}

export default SubscriberDatabase;
