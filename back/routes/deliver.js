const express = require("express");
const router = express.Router();
const Deliver = require("../models/deliver");
const Tour = require("../models/tours");

// Create a new deliver

// Create a new deliver swagger documentation
/**
 * @swagger
 * /deliver:
 *   post:
 *     summary: Create a new deliver
 *     tags: [Deliver]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *                 description: The deliver name
 *               isAvailable:
 *                 type: boolean
 *                 description: The deliver is available or not
 *               carType:
 *                 type: string
 *                 description: The deliver car type
 *               date:
 *                 type: string
 *                 description: The deliver date
 *     responses:
 *       200:
 *         description: The deliver was successfully created
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deliver'
 *       500:
 *         description: Some server error
 *       400:
 *         description: Some parameters may be missing
 */
router.post("/", async (req, res) => {
  try {
    const deliver = new Deliver(req.body);
    await deliver.save();
    res.status(201).send(deliver);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all delivers documentation swagger
/**
 * @swagger
 * /deliver:
 *   get:
 *     summary: Returns the list of all the delivers
 *     tags: [Deliver]
 *     responses:
 *       200:
 *         description: The list of the delivers
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deliver'
 *       default:
 *         description: Unexpected error
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Get all delivers with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const skips = pageSize * (page - 1);

    const delivers = await Deliver.find().skip(skips).limit(pageSize);
    //add nombre de tournées pour chaque livreur dans la réponse
    for (let i = 0; i < delivers.length; i++) {
      const tours = await Tour.find({ deliver: delivers[i]._id });
      delivers[i].nbrTours = tours.length;
    }

    res.send(delivers);
  } catch (error) {
    console.log("🚀 ~ file: deliver.js:67 ~ router.get ~ error:", error);
    res.status(500).send(error);
  }
});

// get by id swagger documentation
/**
 * @swagger
 * /deliver/{id}:
 *   get:
 *     summary: Get the deliver by id
 *     tags: [Deliver]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The deliver id
 *     responses:
 *       200:
 *         description: The deliver description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deliver'
 *       404:
 *         description: The deliver was not found
 */

// Get a specific deliver by ID
router.get("/:id", async (req, res) => {
  try {
    const deliver = await Deliver.findById(req.params.id);
    console.log("🚀 ~ file: deliver.js:76 ~ router.get ~ deliver:", deliver);

    if (!deliver) {
      return res.status(404).send();
    }

    res.send(deliver);
  } catch (error) {
    res.status(500).send(error);
  }
});

// filter by created data after specific date and before specific date and between 2 specific dates and by isAvailable
router.get("/", async (req, res) => {
  try {
    const { startDate, endDate, isAvailable } = req.query;
    const delivers = await Deliver.find({
      date: { $gte: startDate, $lte: endDate },
      isAvailable: isAvailable,
    });
    res.send(delivers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// user.date before specific date
router.get("/", async (req, res) => {
  try {
    const { date } = req.query;
    const delivers = await Deliver.find({
      date: { $lte: date },
    });

    res.send(delivers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// filter after specific date
router.get("/", async (req, res) => {
  try {
    const { date } = req.query;
    const delivers = await Deliver.find({
      date: { $gte: date },
    });
    res.send(delivers);
  } catch (error) {
    console.log("🚀 ~ file: deliver.js:119 ~ router.get ~ error:", error);
    res.status(500).send(error);
  }
});
//swagger doc for patch
/**
 * @swagger
 * /deliver/{id}:
 *  patch:
 *    summary: Update the deliver by the id
 *    tags: [Deliver]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The deliver id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *               name:
 *                 type: string
 *                 description: The deliver name
 *               isAvailable:
 *                 type: boolean
 *                 description: The deliver is available or not
 *               carType:
 *                 type: string
 *                 description: The deliver car type
 *               date:
 *                 type: string
 *                 description: The deliver date
 *    responses:
 *      200:
 *        description: The deliver was updated
 *        contens:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Deliver'
 *      404:
 *        description: The deliver was not found
 *      500:
 *        description: Some error happened
 */

// Update a deliver by ID
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  console.log("🚀 ~ file: deliver.js:131 ~ router.patch ~ updates:", updates);

  try {
    const deliver = await Deliver.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!deliver) {
      console.log(
        "🚀 ~ file: deliver.js:148 ~ router.patch ~ deliver:",
        deliver
      );
      return res.status(404).send();
    }

    res.send(deliver);
  } catch (error) {
    console.log("🚀 ~ file: deliver.js:153 ~ router.patch ~ error:", error);
    res.status(400).send(error);
  }
});

//swagger doc for delete
/**
 * @swagger
 * /deliver/{id}:
 *  delete:
 *    summary: Remove the deliver by id
 *    tags: [Deliver]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The deliver id
 *    responses:
 *      200:
 *        description: The deliver was deleted
 *      404:
 *        description: The deliver was not found
 */
// Delete a deliver by ID
router.delete("/:id", async (req, res) => {
  try {
    const deliver = await Deliver.findByIdAndDelete(req.params.id);
    if (!deliver) {
      return res.status(404).send();
    }
    res.send(deliver);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
