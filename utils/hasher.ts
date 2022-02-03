const bcryptjs = require("bcryptjs");

function hasher(text: string) {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(text, salt);
}

export default hasher;
