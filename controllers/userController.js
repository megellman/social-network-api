const { User } = require('../models');

module.exports = {
    // /
    // GET all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // GET a single user by id and populate thought and friend data
    getSingleUser(req, res) {
        User.findOne({ id: req.params.userId })
            .then((user) =>
                !user
                    ? user.status(404).json({
                        message: 'No user found with that ID'
                    })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // POST a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json('User created!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // PUT update a user by its id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { id: req.params.userId },
            { $set: req.body },
            { new: true },
        )
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'No user with this ID!'
                    })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // DELETE a user by its id
    deleteUser(req, res) {
        User.findOneAndRemove({ id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this ID!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // BONUS Remove a user's associated thoughts when deleted
    deleteUserAndThoughts(req, res) {
        User.findOneAndDelete({ id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Thought.deleteMany({ id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // /:userId/friends/:friendId
    // POST add a new friend to user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true },
        )
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'No user with this ID!'
                    })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // DELETE a friend from user's friend list
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true },
        )
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'No user with this ID!'
                    })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
}
