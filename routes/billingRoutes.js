const keys = require('../config/keys');
var stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //Generate Charge
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '5 Dollars for 5 credits',
      source: req.body.id
    });

    //Add credits to users database model
    req.user.credits += 5;
    const user = await req.user.save();

    //Send the new user object back to the front end.
    res.send(user);
  });
};
