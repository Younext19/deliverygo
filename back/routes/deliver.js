const express = require("express");
const router = express.Router();
const Deliver = require("../models/deliver");

// Create a new deliver

/**
 * @swagger
 * /deliver:
 *   post:
 *     summary: Create a delivery person.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The delivery person name.
 *                 example: Younext adams,
 *               isAvailable:
 *                 type: boolean
 *                 description: The delivery availability.
 *                 example: true
 *               carType:
 *                 type: string
 *                 description: The car type or bike .
 *                 example: toyota
 *               date:
 *                 type: date
 *                 description: date of creation .
 *                 example: 2021-08-05T11:22:44.000Z
 *     responses:
 *       201:
 *         ...
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

// Get all delivers with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10; // You can adjust the default page size as needed

    const skips = pageSize * (page - 1);

    const delivers = await Deliver.find().skip(skips).limit(pageSize);

    res.send(delivers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific deliver by ID
router.get("/:id", async (req, res) => {
  try {
    const deliver = await Deliver.findById(req.params.id);
    if (!deliver) {
      return res.status(404).send();
    }
    res.send(deliver);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a deliver by ID
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "isAvailable", "carType"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const deliver = await Deliver.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!deliver) {
      return res.status(404).send();
    }

    res.send(deliver);
  } catch (error) {
    res.status(400).send(error);
  }
});

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
