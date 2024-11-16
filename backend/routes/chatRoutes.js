import express from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} from "../controllers/chatController.js";
import { authenticate } from "../auth/verifyToken.js";

const router = express.Router()
router.route("/").post(authenticate, accessChat);
router.route("/").get(authenticate, fetchChats);
router.route("/group").post( createGroupChat);
router.route("/rename").put( renameGroup);
router.route("/groupremove").put( removeFromGroup);
router.route("/groupadd").put( addToGroup);

export default router