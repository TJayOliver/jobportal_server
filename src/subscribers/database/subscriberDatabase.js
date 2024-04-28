import { executeQuery } from "../../../configuration/mysql.config.js";

class SubscriberDatabase {
  async createSubscriber(subsciberDetails) {
    try {
      const query = `INSERT INTO subscribers (id, email) VALUES (?, ?)`;
      const parameter = subsciberDetails;
      const subscriber = await executeQuery(query, parameter);
      return subscriber;
    } catch (error) {
      throw error;
    }
  }

  async readSubscriber() {
    try {
      const query = `SELECT * FROM subscribers`;
      const subscriber = await executeQuery(query);
      return subscriber;
    } catch (error) {
      throw error;
    }
  }

  async readSubscriberEmail() {
    try {
      const query = `SELECT email FROM subscribers`;
      const subscriber = await executeQuery(query);
      return subscriber;
    } catch (error) {
      throw error;
    }
  }

  async checkSubscriber(email) {
    try {
      const query = `SELECT * FROM subscribers WHERE email=?`;
      const parameter = [email];
      const subscriber = await executeQuery(query, parameter);
      return subscriber;
    } catch (error) {
      throw error;
    }
  }

  async unSubscribe(email) {
    try {
      const query = `DELETE FROM subscribers WHERE email=?`;
      const parameter = [email];
      const subscriber = await executeQuery(query, parameter);
      return subscriber;
    } catch (error) {
      throw error;
    }
  }

  async notifySubscribers({ id, subject, receiver, message, messageId }) {
    try {
      const query = `INSERT INTO mailmessages (id, subject, receiver, message, messageId) VALUES(?,?,?,?,?)`;
      const parameter = [id, subject, receiver, message, messageId];
      const subscriber = await executeQuery(query, parameter);
      return subscriber;
    } catch (error) {
      throw error;
    }
  }

  async readMessages() {
    try {
      const query = `SELECT * FROM mailmessages`;
      const message = await executeQuery(query);
      return message;
    } catch (error) {
      throw error;
    }
  }

  async deleteMessages() {
    try {
      const query = `DELETE FROM mailmessages`;
      const message = await executeQuery(query);
      return message;
    } catch (error) {
      throw error;
    }
  }
}

export default SubscriberDatabase;
