const contactAuth = require("../models/contactAuth");

exports.getContacts = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).json({
        success: false,
        message: "didint get the id",
      });
    }
    const contactId = await contactAuth.find({ userId: req.query.id });
    console.log(contactId);
    if (contactId) {
      return res.status(200).json({
        success: true,
        data: contactId,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.addContact = async (req, res) => {
  console.log("body", req.body);
  const { username, email, phonenumber } = req.body;
  console.log(req.body);
  try {
    if (!username || !phonenumber || !email) {
      return res.status(400).json({
        success: false,
        message: "please add the details",
      });
    }

    const phDb = await contactAuth.findOne({ phonenumber });

    if (phDb) {
      return res.status(400).json({
        success: false,
        message: "phone number alredy exists",
      });
    }

    await contactAuth.create(req.body);

    let message = { success: "contact Added Successfuly" };
    res.status(200).json({
      success: true,
      message,
    });
  } catch (err) {
    console.log("error");
  }
};

exports.deleteContact = async (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({
      success: false,
      message: "cant delete item",
    });
  }

  const deleteContact = await contactAuth.findByIdAndDelete(req.query.id);
  res.status(200).json({
    success: true,
    data: deleteContact,
  });
};

exports.updateContact = async (req, res) => {
  const id = req.query.id;
  console.log("querrry-=", id);
  try {
    const updateContacts = await contactAuth.findOne({ _id: id });

    updateContacts.username = req.body.username;
    updateContacts.email = req.body.email;
    updateContacts.phonenumber = req.body.phonenumber;

    await updateContacts.save();

    res.status(200).json({
      success: true,
      data: updateContacts,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUpdatedContacts = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(401).json({
        success: false,
      });
    }
    const contacts = await contactAuth.findOne({ _id: req.query.id });
    console.log("contactssss=", contacts);
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: err,
    });
  }
};
