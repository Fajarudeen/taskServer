const express = require("express");
const { protect } = require("../middlewares/auth");
const {
  getContacts,
  addContact,
  deleteContact,
  updateContact,
  getUpdatedContacts,
} = require("../controllers/contactAuth");

const router = express.Router();

router.post("/addcontact", protect, addContact);
router.get("/getcontact",protect, getContacts);
router.delete("/deletecontact",protect, deleteContact);
router.put("/updatecontact",protect, updateContact);
router.get("/getupdatecontact",protect, getUpdatedContacts);

module.exports = router;
