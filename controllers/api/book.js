const Book = require("../../models/book");
const { uploads, destroy } = require("../../cloudinaryConfig");

module.exports.getMany = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.create = async (req, res) => {
  let book = new Book({
    ...req.body,
    image: req.files[0].path,
  });

  try {
    const result = await uploads(book.image);
    book.image = result.url;
    book.imageId = result.id;
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.update = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getOne = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: "Not found",
    });
  }
};

module.exports.deleteOne = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    await destroy(book.imageId);
    await book.delete();
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({
      message: "Not found",
    });
  }
};
