module.exports.addToCart = async (req, res) => {
  const { bookId } = req.params;
  try {
    const user = req.user;
    let purchasedProduct = user.cart.find((product) =>
      product.bookId.equals(bookId)
    );
    if (purchasedProduct) {
      purchasedProduct.amount++;
    } else {
      user.cart.push({ bookId, amount: 1 });
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
