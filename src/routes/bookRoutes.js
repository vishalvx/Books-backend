import express from "express";
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookDetails,
} from "../controller/bookController.js";
import { isAuthenticatedUser, authorizedRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/books").get(getAllBooks);
router
  .route("/admin/book/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createBook);
/**
 * here i use multiple method using single route
 * if method === put then update Book
 * if method === delete then delete Book
 * if Method === Get then get Book Details
 */
router
  .route("/admin/book/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateBook)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteBook);

router.route("/book/:id").get(isAuthenticatedUser, getBookDetails);

export default router;
