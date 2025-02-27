import Blog from '../models/blog.js';
import User from '../models/user.js';
import AppError from '../utils/appError.js';
import APIFeatures from '../utils/APIFeatures.js';

/**
 * @description Get all blogs (for the home page)
 * @route GET /blogs
 * @access Public
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const getAllBlogs = async (req, res, next) => {
    const features = new APIFeatures(Blog.find(), req.query)
        .filter() 
        .sort()
        .limitFields() 
        .paginate();

    const blogs = await features.query.populate('author', 'firstName lastName');

    res.status(200).json({
        success: true,
        message: 'Blogs fetched successfully',
        results: blogs.length,
        data: blogs,
    });
};

/**
 * @description Search blogs by title or tags
 * @route GET /blogs/search
 * @access Public
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const searchBlogs = async (req, res, next) => {
    const { search, searchFields } = req.query;
    const searchFieldsArray = searchFields ? searchFields.split(',') : ['title', 'tags'];

    const searchQuery = {
        $or: searchFieldsArray.map(field => ({
            [field]: { $regex: search, $options: 'i' }
        }))
    };

    const features = new APIFeatures(Blog.find(searchQuery), req.query)
        .sort() 
        .limitFields() 
        .paginate(); 

    const blogs = await features.query.populate('author', 'firstName lastName email');

    res.status(200).json({
        success: true,
        message: 'Search results fetched successfully',
        results: blogs.length,
        data: blogs,
    });
};

/**
 * @description Create a new blog
 * @route POST /blogs
 * @access Private (Authenticated users only)
 * @param {object} req - Express request object containing blog details
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const createBlog = async (req, res, next) => {
    const { title, body, photo, tags } = req.body;
    const author = req.user._id; 

    const blog = await Blog.create({
        title,
        body,
        photo,
        tags,
        author,
    });

    await User.findByIdAndUpdate(author, {
        $push: { blogs: blog._id },
    });

    res.status(201).json({
        success: true,
        message: 'Blog created successfully',
        data: blog,
    });
};

/**
 * @description Get blogs of the logged-in user
 * @route GET /blogs/me
 * @access Private (Authenticated users only)
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const getMyBlogs = async (req, res, next) => {
    const author = req.user._id; 

    const features = new APIFeatures(Blog.find({ author }), req.query)
        .filter() 
        .sort() 
        .limitFields() 
        .paginate();

    const blogs = await features.query.populate('author', 'firstName lastName email');

    res.status(200).json({
        success: true,
        message: 'Your blogs fetched successfully',
        results: blogs.length,
        data: blogs,
    });
};

/**
 * @description Update a blog
 * @route PUT /blogs/:id
 * @access Private (Authenticated users only)
 * @param {object} req - Express request object containing blog details
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const updateBlog = async (req, res, next) => {
    const { id } = req.params;
    const { title, body, photo, tags } = req.body;
    const author = req.user._id;

    const blog = await Blog.findOneAndUpdate(
        { _id: id, author },
        { title, body, photo, tags },
        { new: true }
    );

    if (!blog) {
        return next(new AppError('Blog not found or unauthorized', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Blog updated successfully',
        data: blog,
    });
};

/**
 * @description Delete a blog
 * @route DELETE /blogs/:id
 * @access Private (Authenticated users only)
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const deleteBlog = async (req, res, next) => {
    const { id } = req.params;
    const author = req.user._id;

    const blog = await Blog.findOneAndDelete({ _id: id, author });

    if (!blog) {
        return next(new AppError('Blog not found or unauthorized', 404));
    }

    await User.findByIdAndUpdate(author, {
        $pull: { blogs: blog._id },
    });

    res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
    });
};