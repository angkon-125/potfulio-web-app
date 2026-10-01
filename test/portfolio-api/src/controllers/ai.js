const asyncHandler = require('../middleware/async');
const Profile = require('../models/Profile');
const Project = require('../models/Project');

// @desc    Get AI bot response
// @route   POST /api/ai
// @access  Public
exports.getBotResponse = asyncHandler(async (req, res, next) => {
    const { message } = req.body;

    if (!message || !String(message).trim()) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a message'
        });
    }

    const profile = await Profile.findOne();
    const projects = await Project.findAll({ attributes: ['title'] });
    const name = profile?.name || 'this portfolio';
    const query = String(message).toLowerCase();
    let response = `Ask about ${name}'s skills, projects, or contact details.`;

    if (query.includes('skill') || query.includes('tech')) {
        const skills = Array.isArray(profile?.skills) ? profile.skills : [];
        response = skills.length
            ? `${name}'s skills include ${skills.join(', ')}.`
            : `${name} has not listed any skills yet.`;
    } else if (query.includes('project')) {
        const titles = projects.map((project) => project.title).filter(Boolean);
        response = titles.length
            ? `${name}'s projects include ${titles.join(', ')}.`
            : `${name} has not published any projects yet.`;
    } else if (query.includes('contact') || query.includes('email') || query.includes('reach')) {
        response = profile?.email
            ? `You can reach ${name} at ${profile.email}.`
            : `No public email is listed yet. You can use the contact form.`;
    } else if (query.includes('about') || query.includes('who') || query.includes('bio')) {
        response = profile?.about || profile?.bio || `${name} has not added a bio yet.`;
    }

    res.status(200).json({
        success: true,
        data: response
    });
});
