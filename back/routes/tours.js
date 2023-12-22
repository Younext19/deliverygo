const express = require("express");
const router = express.Router();
const Tour = require("../models/tours");
const Deliver = require("../models/deliver"); // You should import the Deliver model if you need it

//swager doc for post Tour
/**
 * @swagger
 * /tour:
 *   post:
 *     summary: Create a new tour
 *     tags: [Tour]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *                 description: The tour name
 *               startDate:
 *                 type: string
 *                 description: The tour start date
 *               endDate:
 *                 type: string
 *                 description: The tour end date
 *               deliver:
 *                 type: string
 *                 description: The tour deliver
 *               deliveries:
 *                 type: array
 *                 description: The tour deliveries
 *     responses:
 *       200:
 *         description: The tour was successfully created
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       500:
 *         description: Some server error
 *       400:
 *         description: Some parameters may be missing
 */
// Create a new tour
router.post("/", async (req, res) => {
  try {
    const tour = new Tour(req.body);
    if (tour.startDate > tour.endDate) {
      return res.status(400).send({ error: "Invalid dates!" });
    }
    await tour.save();
    res.status(201).send(tour);
  } catch (error) {
    console.error("Error creating tour:", error);
    res.status(400).send(error);
  }
});

//swagger for get
/**
 * @swagger
 * /tour:
 *   get:
 *     summary: Returns the list of all the tours
 *     tags: [Tour]
 *     responses:
 *       200:
 *         description: The list of the tours
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 */

router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find();

    res.send(tours);
  } catch (error) {
    console.error(error);
  }
});

//swagger for patch by id
/**
 * @swagger
 * /tour/{id}:
 *   patch:
 *     summary: Update the tour by the id
 *     tags: [Tour]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tour id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *                 description: The tour name
 *               startDate:
 *                 type: string
 *                 description: The tour start date
 *               endDate:
 *                 type: string
 *                 description: The tour end date
 *               deliver:
 *                 type: string
 *                 description: The tour deliver
 *               deliveries:
 *                 type: array
 *                 description: The tour deliveries
 *     responses:
 *       200:
 *         description: The tour was successfully updated
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       404:
 *         description: The tour was not found
 *       500:
 *         description: Some error happened
 *       400:
 *         description: Some parameters may be missing
 */
//update tour
router.patch("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).send();
    }

    tour.name = req.body.name;
    tour.startDate = req.body.startDate;
    tour.endDate = req.body.endDate;

    //jupdate deliver and make isAvailable=false
    const deliver = await Deliver.findById(tour.deliver);
    deliver.isAvailable = false;
    await deliver.save();

    // update tour and assign deliver name to it
    tour.deliver = deliver.name;

    await tour.save();

    res.send(tour);
  } catch (error) {
    res.status(400).send(error);
  }
});

// swagger for delete
/**
 * @swagger
 * /tour/{id}:
 *  delete:
 *    summary: Remove the tour by id
 *    tags: [Tour]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The tour id
 *    responses:
 *      200:
 *        description: The tour was deleted
 *      404:
 *        description: The tour was not found
 *      500:
 *        description: Some error happened
 */
router.delete("/:id", async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      res.status(404).send();
    }

    res.send(tour);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
