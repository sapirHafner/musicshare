import express from 'express';
import songRouter from './song.mjs';
import postRouter from './post.mjs';
import profileRouter from './profile.mjs';
import userRouter from './users.mjs';
import friendsRouter from './friends.mjs'
import likesRouter from './likes.mjs'
import discoveryRouter from './discovery.mjs'
import artistRouter from './artist.mjs'
import albumRouter from './album.mjs'

const router = express.Router();
router.use(songRouter);
router.use(profileRouter);
router.use(friendsRouter);
router.use(userRouter);
router.use(likesRouter);
router.use(discoveryRouter);
router.use(postRouter);
router.use(artistRouter);
router.use(albumRouter);

export default router;