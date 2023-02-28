const { User, Thought, reactionSchema } = require('../models');
const mongoose = require('mongoose');

module.exports = {
    // /
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // GET a single thought by its id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // POST a new thought (push thought's id to user's thought array)
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true },
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID',
                    })
                    : res.json('Created the thought 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // PUT update a thought by its id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true },
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'No thought with this ID!'
                    })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // DELETE a thought by it's id
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true },
                    ))
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created but no user with this id!',
                    })
                    : res.json({ message: 'Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // :thoughtId/reactions
    // POST a reaction in a single thought's reactions array field
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then((thought) =>
        !thought
            ? res.status(404).json({
                message: 'Reaction created, but found no thought that that ID',
            })
            : res.json({ message: 'Reaction created!' })
    )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
},
    // DELETE pull and remove a reaction by the reaction's reactionId value
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.body.reaction_id} } },
            { new: true }
        )
            .then((thought) =>
        !thought
            ? res.status(404).json({
                message: 'Reaction created, but found no thought that that ID',
            })
            : res.json({ message: 'Reaction successfully deleted!' })
    )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
}
}

