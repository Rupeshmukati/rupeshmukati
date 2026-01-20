const router = require("express").Router();
const {
  Intro,
  About,
  Project,
  Contact,
  Experience,
  Course,
  Socialurl,
} = require("../models/portfolioModel");
const User = require("../models/userModel");
const upload = require("../middlewares/upload"); // Aapka middleware

//* get all portfolio data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const projects = await Project.find();
    const contacts = await Contact.find();
    const experiences = await Experience.find();
    const courses = await Course.find();
    const socialurls = await Socialurl.find();

    res.status(200).send({
      intro: intros[0],
      about: abouts[0],
      project: projects,
      contact: contacts[0],
      experience: experiences,
      course: courses,
      socialurl: socialurls[0],
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Update Introduction
router.post("/update-intro", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      // Agar user ne nayi image upload ki hai
      updateData.image = req.file.filename;
    } else if (req.body.image === "null" || !req.body.image) {
      // Agar user ne admin se image delete kar di hai
      updateData.image = "";
    }

    const intro = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      updateData,
      { new: true },
    );

    res.status(200).send({
      data: intro,
      success: true,
      message: "Introduction updated successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

//* Update Contact
router.post("/update-contact", async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );
    res.status(200).send({
      data: contact,
      success: true,
      message: "Contact Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Update Social URLs
router.post("/update-socialurl", async (req, res) => {
  try {
    const socialurl = await Socialurl.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );
    res.status(200).send({
      data: socialurl,
      success: true,
      message: "Social URLs Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Update About
router.post("/update-about", async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );
    res.status(200).send({
      data: about,
      success: true,
      message: "Abouts Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* ADD Experience
router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience Added Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Update Experience
router.post("/update-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Delete Experience
router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* ADD Project
router.post("/add-project", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(200).send({
      data: project,
      success: true,
      message: "Project Added Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Update Project
router.post("/update-project", async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );
    res.status(200).send({
      data: project,
      success: true,
      message: "Project Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Delete Project
router.post("/delete-project", async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: project,
      success: true,
      message: "Project Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* ADD Course
router.post("/add-course", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(200).send({
      data: course,
      success: true,
      message: "Course Added Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Update Course
router.post("/update-course", async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );
    res.status(200).send({
      data: course,
      success: true,
      message: "Course Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Delete Course
router.post("/delete-course", async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: course,
      success: true,
      message: "Course Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//admin login
router.post("/admin-login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    user.password = "";
    if (user) {
      res.status(200).send({
        data: user,
        success: true,
        message: "Login Successfully",
      });
    } else {
      res.status(200).send({
        data: user,
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
