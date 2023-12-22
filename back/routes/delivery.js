const express = require("express");
const router = express.Router();
const Tour = require("../models/tours");
const Delivery = require("../models/delivery");

// Create a new livraison swagger documentation
/**
 * @swagger
 * /livraison:
 *   post:
 *     summary: Create a new livraison
 *     tags: [livraison]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               pickupAddress:
 *                 type: string
 *                 description: The pickup address
 *               depositAddress:
 *                 type: string
 *                 description: The deposit address
 *               status:
 *                 type: string
 *                 description: The delivery status
 *               tourAssigned:
 *                 type: string
 *                 description: The tour assigned
 *     responses:
 *       200:
 *         description: The livraison was successfully created
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/livraison'
 *       500:
 *         description: Some server error
 *       400:
 *         description: Some parameters may be missing
 */

// Create a new delivery
router.post("/", async (req, res) => {
  try {
    const delivery = new Delivery(req.body);
    await delivery.save();
    res.send(delivery);
  } catch (error) {
    console.error("Error creating delivery:", error);
    res.status(400).send(error);
  }
});

// swagger for get all deliveries
/**
 * @swagger
 * /livraison:
 *   get:
 *     summary: Returns the list of all the deliveries
 *     tags: [livraison]
 *     responses:
 *       200:
 *         description: The list of the deliveries
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/livraison'
 *       500:
 *         description: Some server error
 */

// Get all deliveries
router.get("/", async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.send(deliveries);
  } catch (error) {
    console.error("Error getting deliveries:", error);
    res.status(400).send(error);
  }
});

// swagger for delete by id
/**
 * @swagger
 * /livraison/{id}:
 *   delete:
 *     summary: Remove the delivery by id
 *     tags: [livraison]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The delivery id
 *
 *     responses:
 *       200:
 *         description: The delivery was deleted
 *       404:
 *         description: The delivery was not found
 *       500:
 *         description: Some server error
 */

router.delete("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);

    if (!delivery) {
      res.status(404).send();
    }

    res.send(delivery);
  } catch (error) {
    res.status(500).send(error);
  }
});

//swagger for put delivery
/**
 * @swagger
 * /livraison/{id}:
 *  put:
 *    summary: Update the delivery by id
 *    tags: [livraison]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The delivery id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *               pickupAddress:
 *                 type: string
 *                 description: The pickup address
 *               depositAddress:
 *                 type: string
 *                 description: The deposit address
 *               status:
 *                 type: string
 *                 description: The delivery status
 *               tourAssigned:
 *                 type: string
 *                 description: The tour assigned
 *    responses:
 *      200:
 *        description: The delivery was updated
 *        contens:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/livraison'
 *      404:
 *        description: The delivery was not found
 *      500:
 *        description: Some error happened
 *      400:
 *        description: Some parameters may be missing
 */

router.put("/:id", async (req, res) => {
  try {
    // get the delivery by id
    const delivery = await Delivery.findById(req.params.id);
    // update the delivery
    delivery.depositAddress = req.body.depositAddress;
    delivery.pickupAddress = req.body.pickupAddress;
    delivery.status = req.body.status;

    // assign tour name to the delivery
    const tour = await Tour.findById(req.body.tourAssigned);
    delivery.tour = tour.name;

    // save the delivery
    await delivery.save();
    res.send(delivery);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

module.exports = router;
