const mongoose = require("mongoose");

const introSchema = new mongoose.Schema({
  welcomeText: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  caption: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false }, // <-- Yeh field add karein
});

const aboutSchema = new mongoose.Schema({
  lottieURL: { type: String, required: true, trim: true },
  description1: { type: String, required: true, trim: true },
  description2: { type: String, required: true, trim: true },
  skills: { type: [String], required: true },
});

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  period: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
});

const projectsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  link: { type: String, required: true, trim: true },
  technologies: { type: [String], required: true },
});

const coursesSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  link: { type: String, required: true, trim: true },
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email"],
  },
  mobile: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
});

const socialurlSchema = new mongoose.Schema({
  facebook: { type: String, required: true, trim: true },
  emailid: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email"],
  },
  linkedin: { type: String, required: true, trim: true },
  whatsapp: { type: String, required: true, trim: true },
});

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
    },
    projectDetails: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = {
  Intro: mongoose.model("intros", introSchema),
  About: mongoose.model("abouts", aboutSchema),
  Experience: mongoose.model("experiences", experienceSchema),
  Project: mongoose.model("projects", projectsSchema),
  Course: mongoose.model("courses", coursesSchema),
  Contact: mongoose.model("contacts", contactSchema),
  Socialurl: mongoose.model("socialurls", socialurlSchema),
  Enquiry: mongoose.model("enquiries", enquirySchema),
};
