// Cake's Controller
import CakeModel from '../models/CakeModel';

export const getCakesList = (req, res) => {
  CakeModel.find({}, (err, cakes) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    res.json(cakes);
  });
};

export const getCakeById = (req, res) => {
  const { cakeId } = req.params;
  CakeModel.findById(cakeId, (err, cake) => {
    if (err) {
      return res.send({
        message: 'Something went wrong looking for the cake.',
      });
    }
    const { name, price, flavors } = cake;
    res.json({ name, price, flavors });
  });
};

export const updateCake = (req, res) => {
  const { cakeId } = req.params;
  const { name, price, flavors } = req.body;

  CakeModel.findOneAndUpdate(
    { _id: cakeId },
    { name, price, flavors },
    (err, updatedCake) => {
      if (err) {
        return res.send({ message: 'Something went wrong updating the cake.' });
      }
      // console.log('updatedCake :>> ', updatedCake);
      let { name, price, flavors } = updatedCake;
      res.send({ name, price, flavors });
    }
  );
};

export const deleteCake = (req, res) => {
  const { cakeId } = req.params;

  CakeModel.findByIdAndRemove(cakeId, (err, response) => {
    if (err) {
      return res.send({ message: 'Something went wrong updating the cake.' });
    } else if (!response) {
      return res.status(404).send({ message: 'The cake does not exist.' });
    }
    console.log('response :>> ', response);

    res.send({ message: 'The cake was successfully deleted!' });
  });
};

export const registerCake = (req, res) => {
  // console.log('Body Object :>> ', req.body);
  const { name, price, flavors } = req.body;
  const newCake = new CakeModel({
    name,
    price,
    flavors,
  });
  // Save the new cake
  newCake.save((err, cake) => {
    if (err) {
      let errorMessage = 'Cake was not created :/';
      if (err.message.indexOf('duplicate key error') !== -1) {
        errorMessage = `This cake's name has been already registered!`;
      }
      // Returning error messge
      return res.status(500).json({ message: errorMessage });
    }
    // Everything ok
    res.send(cake);
    // {
    //   name: cake.name,
    //   price: cake.price,
    //   flavors: cake.flavors,
    // }
  });
};
