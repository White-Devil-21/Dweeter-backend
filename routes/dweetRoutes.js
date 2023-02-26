import express from "express"
import { getDweets, getUserDweets, createUser, createDweet, getUserFollowers, followUser, dweetComment, getDweetComments, unfollowUser } from "../controllers/dweetController.js"

const router = express.Router()

router.get('/', getDweets)

router.get('/', getUserDweets)

router.post('/comment', dweetComment)

router.put('/comment', getDweetComments)

router.post('/follow', followUser)

router.delete('/follow', unfollowUser)

router.post('/user', getUserFollowers)

router.post('/', createUser)

router.put('/', createDweet)

// router.delete('/:id', deleteDweet)

export default router