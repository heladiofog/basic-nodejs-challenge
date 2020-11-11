import {
  registerCake,
  getCakesList,
  getCakeById,
  updateCake,
  deleteCake,
} from '../controllers/CakeController';

const routes = (app) => {
  app
    .route('/cakes')
    .get((req, res, next) => {
      // middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getCakesList)
    // POST endpoint
    .post(registerCake);

  app
    .route('/cakes/:cakeId')
    // get a specific cake
    .get(getCakeById)

    // put request
    .put(updateCake)

    // delete request
    .delete(deleteCake);
};

export default routes;
