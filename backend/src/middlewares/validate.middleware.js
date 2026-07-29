export const validate = (validatorFn) => (req, res, next) => {
  try {
    validatorFn(req);
    next();
  } catch (error) {
    next(error);
  }
};
