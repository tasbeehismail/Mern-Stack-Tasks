import { Router } from "express";
import asyncHandler from '../utils/asyncHandler.js';
import * as blogController from "../controllers/blog.js";
import { isValidId } from "../validation/idValidation.js";
import { verifyToken } from "../services/auth.service.js";

const router = Router();

// Public routes
router.get("/", 
    asyncHandler(blogController.getAllBlogs)); 
    
router.get("/search", 
    asyncHandler(blogController.searchBlogs));

// Protected routes (only for authenticated users)
router.post("/", 
    verifyToken(), 
    asyncHandler(blogController.createBlog));

router.get("/me", 
    verifyToken(), 
    asyncHandler(blogController.getMyBlogs)); 


router.get("/:id", 
    verifyToken(), 
    asyncHandler(blogController.getSingleBlog)); 

router.put("/:id", 
    verifyToken(), 
    isValidId(), 
    asyncHandler(blogController.updateBlog));

router.delete("/:id", 
    verifyToken(), 
    isValidId(), 
    asyncHandler(blogController.deleteBlog));

export default router;