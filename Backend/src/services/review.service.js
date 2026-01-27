import { models as db } from "../models/index.js";

const { Review, User, Service, Staff } = db;

// Add review
export const addReview = async (userId, data) => {
  return await Review.create({
    userId,
    ...data, // should include serviceId, staffId, rating, comment
  });
};

// Staff respond to review
export const respondReview = async (reviewId, response) => {
  const review = await Review.findByPk(reviewId);
  if (!review) throw new Error("Review not found");

  review.response = response;
  await review.save();
  return review;
};

// Get reviews by query (serviceId / staffId)
export const getReviews = async (query) => {
  const { serviceId, staffId } = query;
  const where = {};
  if (serviceId) where.serviceId = serviceId;
  if (staffId) where.staffId = staffId;

  return await Review.findAll({
    where,
    include: [
      { model: User, as: "user", attributes: ["id", "name"] },
      { model: Service, as: "service", attributes: ["id", "name"] },
      { model: Staff, as: "staff", attributes: ["id", "name"] },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// Optional: Admin get all reviews
export const getAllReviews = async () => {
  return await Review.findAll({
    include: [
      { model: User, as: "user", attributes: ["id", "name"] },
      { model: Service, as: "service", attributes: ["id", "name"] },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// Optional: Delete review (Admin)
export const deleteReview = async (id) => {
  const review = await Review.findByPk(id);
  if (!review) throw new Error("Review not found");

  await review.destroy();
  return true;
};
