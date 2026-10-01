const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = asyncHandler(async (req, res, next) => {
    // Basic filtering implementation for now
    // Advanced filtering matching Mongoose operators can be added using Op

    const projects = await Project.findAll({
        order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
    });
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = asyncHandler(async (req, res, next) => {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
        return next(
            new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: project
    });
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Admin
const cleanProjectBody = (body = {}) => {
    const project = { ...body };
    ['githubLink', 'liveLink', 'image'].forEach((key) => {
        if (!(key in project)) return;
        if (!project[key]) project[key] = null;
    });
    if (typeof project.techStack === 'string') {
        project.techStack = project.techStack.split(',').map((item) => item.trim()).filter(Boolean);
    }
    if (project.techStack && !Array.isArray(project.techStack)) {
        project.techStack = [];
    }
    return project;
};

exports.createProject = asyncHandler(async (req, res, next) => {
    const project = await Project.create(cleanProjectBody(req.body));

    res.status(201).json({
        success: true,
        data: project
    });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
exports.updateProject = asyncHandler(async (req, res, next) => {
    let project = await Project.findByPk(req.params.id);

    if (!project) {
        return next(
            new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
        );
    }

    await project.update(cleanProjectBody(req.body));

    res.status(200).json({
        success: true,
        data: project
    });
});

exports.uploadProjectImage = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        return next(new ErrorResponse('Please upload a file', 400));
    }

    res.status(200).json({
        success: true,
        data: `/uploads/${req.file.filename}`
    });
});

exports.deleteProject = asyncHandler(async (req, res, next) => {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
        return next(
            new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
        );
    }

    await project.destroy();

    res.status(200).json({
        success: true,
        data: {}
    });
});
