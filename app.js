import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import articleRouter from "./src/article/router/articleRouter.js";
import administratorRouter from "./src/admin/router/adminstratorRouter.js";
import scholarshipRouter from "./src/scholarship/router/scholarshipRouter.js";
import subscriberRouter from "./src/subscribers/router/subscriberRouter.js";
import jobRouter from "./src/job/router/jobRouter.js";
import categoryRouter from "./src/category/router/categoryRouter.js";
import testimonialRouter from "./src/testimonial/router/testimonialRouter.js";
import passport from "passport";
import session from "express-session";
import mysqlStore from "express-mysql-session";
import userLimiter from "./configuration/rateLimiter.js";
import cookieRouter from "./src/cookies/router/cookieRouter.js";
import { retrieveToken } from "./configuration/tokens.js";

const app = express();

const PORT = process.env.PORT || "4040";

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(morgan("dev"));

app.use("/upload", express.static("./upload"));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(retrieveToken);

const factory = mysqlStore(session);
const options = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  checkExpirationInterval: 60 * 60 * 1000,
  expiration: 60 * 60 * 1000,
};
const sessionStore = new factory(options);

app.use(
  session({
    key: "_u",
    secret: process.env._u,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { secure: true, sameSite: "strict", maxAge: 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(userLimiter);

app.use(articleRouter);
app.use(administratorRouter);
app.use(scholarshipRouter);
app.use(subscriberRouter);
app.use(jobRouter);
app.use(categoryRouter);
app.use(testimonialRouter);
app.use(cookieRouter);

app.listen(PORT, () => console.log(`Connected on http://localhost:${PORT}`));