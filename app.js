import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import articleRouter from "./src/article/router/articleRouter.js";
import administratorRouter from "./src/admin/router/adminstratorRouter.js";
import scholarshipRouter from "./src/scholarship/router/scholarshipRouter.js";
import subscriberRouter from "./src/subscribers/router/subscriberRouter.js";
import jobRouter from "./src/job/router/jobRouter.js";
import categoryRouter from "./src/category/router/categoryRouter.js";
import testimonialRouter from "./src/testimonial/router/testimonialRouter.js";
import cookieRouter from "./src/cookies/router/cookieRouter.js";
import { retrieveToken } from "./configuration/tokens.js";
import { connectMongoDB } from "./configuration/mongodb.config.js";
import compression from "compression";

const app = express();

const PORT = process.env.PORT || 4040;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(morgan("tiny"));
app.enable("trust proxy");

app.use("/upload", express.static("./upload"));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(compression());

app.use(retrieveToken);

app.use(
  session({
    key: "_u",
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: false,
    cookie: { secure: true, sameSite: "strict", maxAge: 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_ATLAS,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use(userLimiter);

app.use(articleRouter);
app.use(administratorRouter);
app.use(scholarshipRouter);
app.use(subscriberRouter);
app.use(jobRouter);
app.use(categoryRouter);
app.use(testimonialRouter);
app.use(cookieRouter);

app.get("/", (req, res) => {
  res.send(`Is working on port ${PORT}`);
});

connectMongoDB();
app.listen(PORT, () => console.log(`Connected on Port: ${PORT}`));
