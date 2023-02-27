const router = require('express').Router();

const { deleteUserAndThoughts } = require('../../controllers/userController');
const{
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/thoughts/:thoughtId
router.route('/').delete(deleteUserAndThoughts);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;