const path = require("path");
const User = require("../models/user.model");

module.exports.index = async function (req, res) {
  const users = await User.find();
  res.render("users/index", {
    users,
  });
};
// req là đối số mà FE gửi, req.query sẽ trả về Query parameters trên url mà FE gửi
module.exports.search = async function (req, res) {
  var q = req.query.q;
  const users = await User.find();
  var matchedUsers = users.filter(function (user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("users/index", {
    users: matchedUsers,
    search: q,
  });
};
module.exports.create = function (req, res) {
  res.render("users/create");
};
module.exports.get = async function (req, res) {
  var id = req.params.id;
  var user = await User.findById(id).exec();
  res.render("users/view", {
    user,
  });
};

module.exports.postCreate = async function (req, res) {
  const user = {
    ...req.body,
    avatar: req.file.path.split(path.sep).slice(1).join("/"),
  };
  await User.create(user);
  res.redirect("/users");
};
