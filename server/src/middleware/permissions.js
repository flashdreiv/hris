const isOwnerOnly = (req, res, next) => {
  console.log("owner only");
  next();
};

export { isOwnerOnly };
