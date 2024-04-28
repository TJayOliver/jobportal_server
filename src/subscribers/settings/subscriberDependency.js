import SubscriberController from "../controller/subscriberController.js";
import SubscriberService from "../service/subscriberService.js";
import SubscriberDatabase from "../database/subscriberDatabase.js";

export const subscriberDependencies = () => {
  const externalDatabase = new SubscriberDatabase();
  const subscriberService = new SubscriberService(externalDatabase);
  const subscriberController = new SubscriberController(subscriberService);

  return { subscriberController };
};
