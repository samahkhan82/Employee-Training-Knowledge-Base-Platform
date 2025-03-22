// backend/controllers/feedbackController.js
const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  try {
    const { userId, comment } = req.body;

    const feedback = new Feedback({ userId, comment });
    await feedback.save();
    res
      .status(201)
      .json({ message: "Feedback submitted successfully", feedback });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to submit feedback", error: err.message });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find().populate("userId", "name email");
    res.status(200).json(feedbackList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch feedback", error: err.message });
  }
};
