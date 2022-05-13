//import model
import Book from "../models/bookModel.js";
//utils
import ApiFeature from "../utils/ApiFeature.js";
import asyncHandler from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create Book -- Admin
export const createBook = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const book = await Book.create(req.body);

  res.status(201).json({
    success: true,
    book: book,
  });
});
// Get ALl books
export const getAllBooks = asyncHandler(async (req, res, next) => {
  const resultsPerPage = 10;
  const bookCount = await Book.countDocuments();
  // apifeature is instance of ApiFeature
  const apiFeature = new ApiFeature(Book.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  // console.log(apiFeature)
  const books = await apiFeature.query;

  //Response
  res.status(200).json({
    success: true,
    books,
    bookCount,
  });
});

// Get Book's Details
export const getBookDetails = asyncHandler(async (req, res, next) => {
  //find Book
  const book = await Book.findById(req.params.id);
  //check is Exist
  if (!book) return next(new ErrorHandler("Book not found", 404));
  //respone
  res.status(200).json({
    succes: true,
    book: book,
  });
});

// Update books --Admin

export const updateBook = asyncHandler(async (req, res, next) => {
  //check book exist
  let book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  //new:true :- return update Book

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    book: book,
  });
});

// Delete Book -- Admin
export const deleteBook = asyncHandler(async (req, res, next) => {
  //find Book
  let book = await Book.findById(req.params.id);
  //check is Exist
  if (!book) return next(new ErrorHandler("Book not found", 404));
  //delete Book
  await book.remove();
  //respone
  res.status(200).json({
    succes: true,
    massage: "Book Deleted successfully",
  });
});