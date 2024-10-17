const Comic = require("../models/comicModel");

// Create Comic Book
const createComic = async (req, res) => {
  try {
    const comic = await Comic.create(req.body);
    res.status(201).json({
      status: "success",
      data: comic,
      message: "Comic created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get Comics by Query
const getComics = async (req, res) => {
  try {
    const {
      authorName,
      condition,
      maxRange,
      minRange = 0,
      yearOfPublication,
      page = 1,
      limit = 10,
      sortBy = "bookName",
    } = req.query;
    let query = {};

    // Filtering
    if (authorName) query.authorName = { $regex: authorName, $options: "i" };
    if (condition) query.condition = condition;
    if (yearOfPublication) query.yearOfPublication = yearOfPublication;
    if (minRange || maxRange) {
      query.price = {};
      if (minRange) query.price.$gte = Number(minRange);
      if (maxRange) query.price.$lte = Number(maxRange);
    }

    // Pagination
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    //Sorting
    const sortOpt = {};
    if (sortBy === "price") {
      sortOpt.price = 1;
    } else if (sortBy === "yearOfPublication") {
      sortOpt.yearOfPublication = 1;
    } else {
      sortOpt.bookName = 1;
    }

    const comics = await Comic.find(query)
      .select("-__v")
      .limit(limitNumber)
      .skip(skip)
      .sort(sortOpt);

    res.status(200).json({
      status: "success",
      count: comics.length,
      data: comics,
      message: "Comics fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get Comic Book by Id
const getComicById = async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id).select("-__v");
    if (!comic) return res.status(404).json({ message: "Comic not found" });
    res.status(200).json({
      status: "success",
      data: comic,
      message: "Comic fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Update Comics Info
const updateComic = async (req, res) => {
  try {
    const updatedComic = await Comic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-__v");
    if (!updatedComic)
      return res.status(404).json({
        status: "fail",
        message: "Comic not found",
      });
    res.status(200).json({
      status: "success",
      data: updatedComic,
      message: "Comic updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Delete Comic Book by Id
const deleteComic = async (req, res) => {
  try {
    const deletedComic = await Comic.findByIdAndDelete(req.params.id);
    if (!deletedComic)
      return res.status(404).json({
        status: "fail",
        message: "Comic not found",
      });
    res.status(200).json({
      status: "success",
      message: "Comic deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  createComic,
  getComics,
  getComicById,
  updateComic,
  deleteComic,
};
