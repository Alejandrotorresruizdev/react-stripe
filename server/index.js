const express = require("express");
const stripe = require("stripe");
const cors = require("cors");
const app = express();

const stripeInstance = new stripe(
  "sk_test_51HTkTlFVqNIpyLIzsfDPXGwNXAu7bEVFpsW13i27T52jRB3RLVAerwaTQRjFl3aTB20OhBE7eQDYqDxUS5SoucBe00COP4stUj"
);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/checkout", async (req, res) => {

    try {
        const payment = await stripeInstance.paymentIntents.create({
            amount: req.body.amount,
            currency: "USD",
            description: "Gaming keyboard",
            payment_method: req.body.id,
            confirm: true,
          });
          res.send(payment);
    } catch (error) {
        console.log(error)
    }

});

app.listen(3001, () => {
  console.log("Server on port ", 3001);
});
