function formatErrors(errors) {
  let errorList = [];
  if (!errors.isEmpty()) {
    errors.errors.map((error) => {
      errorList.push(error.msg);
    });
  }

  return errorList;
}

module.exports = formatErrors;
