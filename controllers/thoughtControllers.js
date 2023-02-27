const { User, Thought } = require('../models');

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
        Thought.findOne({ id: req.params.thoughtId })
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
                    { id: req.body.userId },
                    { $addToSet: { thoughts: thought.id } },
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
            { id: req.params.thoughtId },
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
        Thought.findOneAndRemove({ id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    ))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // :thoughtId/reactions
    // POST a reaction in a single thought's reactions array field
    createReaction(req, res) {
        Reaction.create(req.body)
            .then((reaction) => {
                return Thought.findOneAndUpdate(
                    { id: req.body.thoughtId },
                    { $addToSet: { reactions: reaction.id } },
                    { new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'Reaction created, but found no thought that that ID',
                    })
                    : res.json('Created reaction!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // DELETE pull and remove a reaction by the reaction's reactionId value
    deleteReaction(req, res) {
        Reaction.findOneAndRemove({ id: req.body.reactionId })
            .then((reaction) => {
                !reaction
                    ? res.status(404).json({
                        message: 'No reaction found with that ID'
                    })
                    : Thought.findOneAndUpdate(
                        { id: req.params.thoughtId },
                        { $pull: { reactions: req.body.reactionId } },
                        { new: true }
                    )
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
}
