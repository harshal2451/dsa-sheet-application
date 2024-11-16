import express from 'express';
import sequelize from './config/sequelize';
import { configure as userApis } from './routes/user';
import { configure as topicsApis } from './routes/topic';
import { getService } from './container';
import cors from "cors";
import { json } from 'body-parser';
import { ValidationError } from 'express-json-validator-middleware';
import { StatusCodes } from 'http-status-codes';
import helmet from "helmet";
const app = express();
app.use(json());
app.use(cors());  
app.use(helmet({
  frameguard: { action: "deny" }
}));
app.set("port", process.env.PORT || 3000);


export const baseRouter = express.Router();

userApis(baseRouter, getService());
topicsApis(baseRouter, getService());

app.use("/v1", baseRouter);


// Connect to the MySQL database
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});




//Error handler middleware for validation errors.
app.use((error: any, request: any, response: any, next: any) => {
  if (error instanceof ValidationError) {
    response.status(StatusCodes.EXPECTATION_FAILED).json({ message: error.validationErrors });
    next();
  } else {
    // Pass error on if not a validation error
    next(error);
  }
});

const listener = app.listen(app.get("port"), () => {
  console.log("backend is running at http://localhost:%d", app.get("port"));
})

process.on('SIGTERM', () => {
  listener.close(() => {
    console.log('Closing http server.');
    // process.exit(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION ================>", err)
  // listener.close(() => {
  //   Logger.info('Closing http server.');
  //   process.exit(0);
  // });
})
