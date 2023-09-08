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
import followersRouter from './followers.mjs'
import friendsRequestsRouter from './friendsRequests.mjs';
import logsRouter from './logs.mjs'
import featureFlagRouter from './featureFlags.mjs';

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
router.use(friendsRequestsRouter)
router.use(followersRouter);
router.use(logsRouter);
router.use(featureFlagRouter);

export default router;