import { sendMail } from "../../../mail/sendMail.js";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL;

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
        await sendMail(
          receiverEmail,
          "Empowering Your Journey: Exclusive Job Opportunities, Scholarships, and Career Guidance Await You!",
          `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Future Forte</title>
          </head>
          <style>
    
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

              *{padding: 0; margin: 0;}
              .poppins-medium {
                font-family: "Poppins", sans-serif;
                font-weight: 500;
                font-style: normal;
              }
              .pacifico-regular {
                font-family: "Pacifico", cursive;
                font-weight: 400;
                font-style: normal;
              }
              
              body{
                  background-color: #f9f9f7;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-family:'Poppins', sans-serif;
              }
              main{
                height: 100vh;
                padding: 10px;
              }
              .footer{
                  background-color: black;
                  height: 200px;
                  color: white;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  gap: 30px;
              }
              .socials{
                  display: flex;
                  gap: 25px;
              }
              .site-name{
                font-family: 'Pacifico', cursive;
                  font-size: 50px;
              }
              
              .job, .scholarship, .career{
                  height: 200px;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                  align-items: center;
                  padding: 10px;
              }
              .scholarship{
                  background-color: black;
                  color: white;
              }
              .job a, .scholarship a, .career a{
                  background-color: rgb(253, 253, 253);
                  padding: 8px;
                  border-radius: 8px;
                  text-decoration: none;
                  color: black;
                  display: flex;
                  width: 200px;
              }
              .job, .career{
                  background-color: white;
              }
              .job a, .career a{
                  background-color: #f9f9f7;
                  color: rgb(0, 0, 0);
              }

              .text{
                  display: flex;
                  flex-direction: column;
                  gap: 8px;
                  color: white;
              }
            
              .header{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: black;
                  color: white;
                  padding: 5px;
              }
              .header h1{font-size: 25px;}


              @media only screen and (max-width:480px) {
                  .job, .scholarship, .career{
                  width: full;
                  display: flex;
                  flex-wrap: wrap;
                  padding: 10px;
                  justify-content: space-around;
                  align-items: center;
                  }
                  .header h1{
                      font-size: 5px;
                  }
                  .image{
                      height: 230px;
                  }
                  
                  .main{
                      display: flex;
                      gap:50px
                  }   
                  .site-name{
                      font-size: 25px;
                      font-family : .pacifico-regular
                  }
                  .job a, .scholarship a, .career a{
                      width: 200px;
                  }
              }

              @media only screen and (max-width:768px) {
                  .job, .scholarship, .career{
                  width: full;
                  display: flex;
                  flex-wrap: wrap;
                  padding: 10px;
                  justify-content: space-around;
                  align-items: center;
                  }
                  .header h1{
                      font-size: 20px;
                  }
                  .image{
                      height: 230px;
                  }
                  
                  .main{
                      display: flex;
                      gap:50px
                  }   
                  .image {
                      width: 100%;
                  }
              }
              
          </style>
          <body>
              <main>
                  <div class="header">
                      <h1>Welcome to</h1> <br>
                      <p class="site-name">FutureForte !</p>
                      
                  </div>

                  <!-- job opport -->
                  <div class="job">
                      <div class="text">
                          <h2>Find the latest <br> Job Opportunities</h2>
                          <small>Get ready to elevate your career with our curated list of job openings that match your skills and interests.</small>
                          <a href="${CLIENT_URL}/job">Search</a>
                      </div>
                  </div>

                  <!-- scholarship opport -->
                  <div class="scholarship">
                      <div class="text">
                          <h2>Find the latest <br>Scholarship Opportunities</h2>
                          <small>Explore our  selected scholarships that can help alleviate the financial burden of your academic pursuit</small>
                          <a href="${CLIENT_URL}/scholarship">Search</a>
                      </div>
                  </div>

                  <!-- career opport -->
                  <div class="career">
                      <div class="text">
                          <h2>Read Inspiring Career Guidance Articles</h2>
                          <small>Explore resources that are designed to provide insights and expert advice to help you make decisions</small>
                          <a href="${CLIENT_URL}/articles">Search</a>
                      </div>
                  </div>
                  
                  <div class="footer">
                      <p>Follow us on Social Media</p>
                      <div class=" socials">
                          <p>Facebook</p>
                          <p>Instagram</p>
                          <p>X</p>
                          <p>LinkedIn</p>
                      </div>
                  </div>
                  <a href="${unSubscribeLink}">Click To Unsubscribe</a>
              </main>
          </body>
            </html>`
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
      const response = await sendMail(
        receipients,
        subject,
        `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Future Forte</title>
      </head>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
          @font-face {
              font-family: "AliandoRocky";
              src: url('../../public/font/AliandoRocky.ttf') format("truetype");
          }

          *{padding: 0; margin: 0;}
          body{
              background-color: #f9f9f7;
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: 'Inter', sans-serif;
          }
          main{
            height: 100vh;
            padding: 10px;
          }
          .footer{
              background-color: black;
              height: 400px;
              color: white;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 30px;
          }
          .socials{
              display: flex;
              gap: 25px;
          }
          .site-name{
              font-family: "AliandoRocky", sans-serif;
              font-size: 50px;
          }
        
          .text{
              display: flex;
              flex-direction: column;
              gap: 8px;
          }
        
          .header{
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: black;
              color: white;
              padding: 5px;
          }
          .header h1{font-size: 25px;}
          
      </style>
      <body>
          <main>
              <div class="header">
                  <h1>Welcome to</h1> <br>
                  <p class="site-name">FutureForte !</p>
              </div>
              <div>
              <p>${message}</p>
              <div>
              <div class="footer">
                  <p>Follow us on Social Media</p>
                  <div class=" socials">
                      <p>Facebook</p>
                      <p>Instagram</p>
                      <p>X</p>
                      <p>LinkedIn</p>
                  </div>
              </div>
              <p>${unSubscribeLink}</p>
          </main>
      </body>
        </html>`
      );
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
