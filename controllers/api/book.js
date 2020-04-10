const Book = require("../../models/book");

module.exports.getMany = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.create = async (req, res) => {
  const book = new Book(req.body);
  try {
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
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({
      message: "Not found",
    });
  }
};
