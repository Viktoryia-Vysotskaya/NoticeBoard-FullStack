const fs = require('fs').promises;
const Ad = require('../models/ad.model');
const User = require('../models/user.model');
const isString = require('../utils/validators/isString');
const isNumber = require('../utils/validators/isNumber');
const getImageFileType = require('../utils/getImageFileType');

exports.getAll = async (req, res) => {
    try {
        const ads = await Ad.find().populate('sellerInfo');
        return res.json(ads);
    } catch (err) {
        return res.status(500).json({ error: 'ServerError', message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id).populate('sellerInfo');
        if (ad) {
            return res.json(ad);
        }
        return res.status(404).json({ error: 'NotFound', message: 'Ad not found!' });
    } catch (err) {
        return res.status(500).json({ error: 'ServerError', message: err.message });
    }
};

exports.getBySearchPhrase = async (req, res) => {
    try {
        const pattern = req.params.searchPhrase;
        const ads = await Ad.find({
            title: { $regex: pattern, $options: 'i' },
        }).populate('sellerInfo');

        if (ads.length > 0) {
            return res.json(ads);
        }
        return res.status(404).json({ error: 'NotFound', message: 'No matching ads found!' });
    } catch (err) {
        return res.status(500).json({ error: 'ServerError', message: err.message });
    }
};

exports.post = async (req, res) => {
    const { title, localization, content, price, publicationDate } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    try {
        const user = await User.findOne({ login: req.session.user.login });
        if (!user) {
            await fs.unlink(`./public/uploads/${req.file.filename}`);
            return res.status(400).json({ error: 'BadRequest', message: 'Invalid user!' });
        }

        if (
            isString(title) &&
            isString(localization) &&
            isString(content) &&
            isNumber(price) &&
            isString(publicationDate) &&
            req.file &&
            ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
            user
        ) {
            const newAd = await Ad.create({
                title,
                localization,
                content,
                price,
                publicationDate,
                photo: [req.file.filename],
                sellerInfo: user._id,
            });

            return res.status(201).json({ success: true, message: 'New Ad added', ad: newAd });
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

exports.put = async (req, res) => {
    const { title, localization, content, price, publicationDate } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    try {
        const ad = await Ad.findOne({ _id: req.params.id });
        const user = await User.findOne({ login: req.session.user.login });

        if (!ad || (ad.sellerInfo.toString() !== user._id.toString() && !req.file)) {
            return res.status(400).json({ error: 'BadRequest', message: 'Invalid request!' });
        }

        if (ad.sellerInfo.toString() !== user._id.toString() && req.file) {
            await fs.unlink(`./public/uploads/${req.file.filename}`);
            return res.status(400).json({ error: 'BadRequest', message: 'Invalid request!' });
        }

        if (
            isString(title) &&
            isString(localization) &&
            isString(content) &&
            isNumber(price) &&
            isString(publicationDate)
        ) {
            let newAd = {};

            if (req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
                newAd = await Ad.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        $set: {
                            title,
                            localization,
                            content,
                            price,
                            publicationDate,
                            photo: [req.file.filename],
                        },
                    },
                    { new: true }
                );

                // Asynchronously deleting the previous file
                if (ad.photo) {
                    await fs.unlink(`./public/uploads/${ad.photo}`);
                }
            } else {
                newAd = await Ad.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        $set: {
                            title,
                            localization,
                            content,
                            price,
                            publicationDate,
                        },
                    },
                    { new: true }
                );
            }

            if (newAd) {
                return res.status(200).json({ success: true, message: 'Ad updated', modifiedAd: newAd });
            }

            return res.status(404).json({ error: 'NotFound', message: 'Ad not found!' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'ServerError', message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const ad = await Ad.findOne({ _id: req.params.id });
        const user = await User.findOne({ login: req.session.user.login });

        if (!ad || ad.sellerInfo.toString() !== user._id.toString()) {
            return res.status(400).json({ error: 'BadRequest', message: 'Invalid request' });
        }

        await Ad.deleteOne({ _id: req.params.id });

        // Asynchronous file deletion
        if (ad.photo) {
            await fs.unlink(`./public/uploads/${ad.photo}`);
        }

        return res.status(200).json({ success: true, message: 'Ad deleted', deletedAd: ad });
    } catch (err) {
        return res.status(500).json({ error: 'ServerError', message: err.message });
    }
};
