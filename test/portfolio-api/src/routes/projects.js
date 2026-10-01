const express = require('express');
const {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    uploadProjectImage
} = require('../controllers/projects');
const upload = require('../middleware/upload');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.post('/upload', protect, authorize('admin'), upload.single('image'), uploadProjectImage);

router
    .route('/')
    .get(getProjects)
    .post(protect, authorize('admin'), createProject);

router
    .route('/:id')
    .get(getProject)
    .put(protect, authorize('admin'), updateProject)
    .delete(protect, authorize('admin'), deleteProject);

module.exports = router;
