import { rateLimit } from "express-rate-limit";
import {
  RATE_LIMITER_WINDOW,
  REQUESTS_PER_WINDOW_LIMIT,
} from "../constants/applicationConstants";

export const limiter = rateLimit({
  windowMs: RATE_LIMITER_WINDOW,
  limit: REQUESTS_PER_WINDOW_LIMIT,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Too many requests, please try again later",
});
