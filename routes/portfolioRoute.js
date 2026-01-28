require("dotenv").config();
const router = require("express").Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: false, // 👈 ADD THIS
  tls: {
    // Yeh line Render ke liye compulsory hai
    rejectUnauthorized: false,
  },
});

const {
  Intro,
  About,
  Project,
  Contact,
  Experience,
  Course,
  Socialurl,
  Enquiry,
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
    const enquiries = await Enquiry.find();

    res.status(200).send({
      intro: intros[0],
      about: abouts[0],
      project: projects,
      contact: contacts[0],
      experience: experiences,
      course: courses,
      socialurl: socialurls[0],
      enquiry: enquiries,
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
router.post("/add-project", upload.single("image"), async (req, res) => {
  try {
    const { title, description, link, technologies } = req.body;

    const project = new Project({
      title,
      description,
      link,
      technologies: technologies ? JSON.parse(technologies) : [],
      image: req.file ? req.file.filename : "",
    });

    await project.save();

    res.status(200).send({
      data: project,
      success: true,
      message: "Project added successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

//* UPDATE Project
router.post("/update-project", upload.single("image"), async (req, res) => {
  try {
    const { title, description, link, technologies, _id } = req.body;

    const updateData = {
      title,
      description,
      link,
      technologies: technologies ? JSON.parse(technologies) : [],
      image: "", // ✅ Default empty string
    };

    // ✅ Agar nayi image upload hui
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const project = await Project.findOneAndUpdate({ _id }, updateData, {
      new: true,
    });

    res.status(200).send({
      data: project,
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
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
router.post("/add-course", upload.single("image"), async (req, res) => {
  try {
    const { title, description, link } = req.body;

    const course = new Course({
      title,
      description,
      link,
      image: req.file ? req.file.filename : "",
    });

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
router.post("/update-course", upload.single("image"), async (req, res) => {
  try {
    const { title, description, link, _id } = req.body;

    const updateData = {
      title,
      description,
      link,
      image: "", // ✅ Default empty string
    };

    // ✅ Agar nayi image upload hui
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const course = await Course.findOneAndUpdate({ _id }, updateData, {
      new: true,
    });

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

//* admin login
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

//* Add Enquiry
router.post("/add-enquiry", async (req, res) => {
  try {
    const { name, email, phone, projectDetails } = req.body;

    // 1. Database mein data save karein
    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      projectDetails,
    });
    await newEnquiry.save();

    // 2. Email Notification (Non-blocking way)
    // Hum yahan 'await' nahi laga rahe taaki user ko response turant mil jaye
    const mailOptions = {
      from: `"Portfolio Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `🚀 New Project Enquiry from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #1a237e; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Enquiry Received</h1>
            <p style="margin: 5px 0 0; opacity: 0.8;">Enquiry Form</p>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
            <p style="color: #555; font-size: 16px;">Hello <b>Rupesh</b>, you have a new project enquiry from your portfolio website.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1a73e8;">${email}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${phone || "N/A"}</td></tr>
            </table>
            <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #1a237e;">
              <h4 style="margin: 0 0 10px 0; color: #1a237e;">Project Details:</h4>
              <p style="margin: 0; color: #444; line-height: 1.6;">${projectDetails}</p>
            </div>
            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${email}" style="background-color: #1a237e; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reply to Client</a>
            </div>
          </div>
          <div style="background-color: #f1f1f1; color: #888; padding: 15px; text-align: center; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Rupesh Mukati | Portfolio Enquiry</p>
          </div>
        </div>`,
    };

    // Background mein mail bhej rahe hain
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email background error:", error.message);
      } else {
        console.log("Email background success:", info.response);
      }
    });

    // 3. User ko Success Response turant bhejein
    return res.status(200).send({
      success: true,
      message: "Enquiry submitted successfully!",
    });
  } catch (error) {
    console.log("Main Route Error:", error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong, but your data might be saved.",
    });
  }
});

//* delete Enquiry
router.post("/delete-enquiry", async (req, res) => {
  try {
    await Enquiry.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
