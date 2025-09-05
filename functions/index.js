/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51RybzI3rcqbWM26W" +
    "fcAiTir9LKsPIta74eBgoPUiYB42d6no" +
    "sGFtb8Am34WMA8QcnA18ahhjiRFvOWLX" +
    "NUtWatsr00AiiJLudY",
);

setGlobalOptions({maxInstances: 10});

// API

// App config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API Routes
app.get("/", (request, response) => {
  response.status(200).send("hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.body.amount;
  console.log("payment received >>", total);

  if (!total || total <= 0) {
    return res.status(400).send({
      error: "Invalid payment amount",
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    res.status(500).send({error: e.message});
  }
});
// Listen command
exports.api = onRequest(app);
