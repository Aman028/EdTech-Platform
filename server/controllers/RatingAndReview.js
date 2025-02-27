const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

//create Rating
exports.createRating = async (req, res) => {
  try {
    //get user id
    const userId = req.user.id;
    //fetch data from req body
    const { rating, review, courseId } = req.body;
    //check if user is enrolled
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $eleMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        messsage: "Student is enrolled in the course",
      });
    }
    //check if user aready reviewed or not
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(404).json({
        success: false,
        messsage: "user is already reviewd this course",
      });
    }
    //create review
    const ratingReview = RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });
    //update course with rating and review
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: { ratingAndReviews: ratingReview._id },
      },
      { new: true }
    );
    console.log(updatedCourseDetails);
    //return response
    return res.status(200).json({
      success: true,
      message: "Rating and Review created successfully",
      ratingReview,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

//getAverage rating
exports.getAverageRating = async (req, res) => {
  try {
    //get course id
    const courseId = req.body.courseId;
    //calculate avg rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    //return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    //if no rating exists
    return result.status(200).json({
      success: true,
      message: "Average rating is 0, no rating is given till now",
      averageRating: 0,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

//getAll ratingand rwviews
exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
