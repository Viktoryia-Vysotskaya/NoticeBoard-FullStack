const fs = require('fs').promises;
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const isString = require('../utils/validators/isString');
const getImageFileType = require('../utils/getImageFileType');

exports.registration = async (req, res) => {
    const { login, password, phone } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    try {
        if (
            isString(login) &&
            isString(password) &&
            isString(phone) &&
            req.file &&
            ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
        ) {
            const userWithLogin = await User.findOne({ login });
            if (userWithLogin) {
                await fs.unlink(`./public/uploads/${req.file.filename}`);
                return res.status(409).json({ error: 'UserConflict', message: 'User with this login already exists!' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                login,
                password: hashedPassword,
                phoneNumber: phone,
                avatar: req.file.filename,
            });

            return res.status(201).json({ success: true, message: 'User created', user: { login: user.login } });
        }

        if (req.file) {
            // Asynchronously deleting a file in case of error
            await fs.unlink(`./public/uploads/${req.file.filename}`);
        }

        return res.status(400).json({ error: 'BadRequest', message: 'Invalid request parameters or file type!' });
    } catch (err) {
        return res.status(500).json({ error: 'ServerError', message: err.message });
    }
};

exports.login = async (req, res) => {
    const { login, password } = req.body;
    try {
        if (isString(login) && isString(password)) {
            const user = await User.findOne({ login });
            if (!user) {
                return res
                    .status(400)
                    .json({ error: 'InvalidCredentials', message: 'Login or password are incorrect!' });
            }
            if (bcrypt.compareSync(password, user.password)) {
                const userData = { login: user.login, id: user._id };
                req.session.user = userData;
                return res.status(200).json({ success: true, message: 'Login successful!' });
            }
            return res
                .status(400)
                .json({ error: 'InvalidCredentials', message: 'Login or password are incorrect!' });
        }
        return res.status(400).json({ error: 'BadRequest', message: 'Invalid request parameters!' });
    } catch (err) {
        return res.status(500).json({ error: 'ServerError', message: err.message });
    }
};

exports.getUser = async (req, res) => {
    return res.json({ success: true, message: 'Yeah, I\'m logged!' });
};

exports.logout = async (req, res) => {
    try {
        req.session.destroy();
        return res.status(200).json({ success: true, message: 'Yeah, You\'ve just logged out!' });
    } catch (err) {
        return res.status(500).json({ error: 'ServerError', message: err.message });
    }
};
