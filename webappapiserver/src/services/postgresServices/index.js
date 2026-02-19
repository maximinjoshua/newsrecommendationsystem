import { articleService } from "./article.service.js";
import {authService} from "./auth.service.js";
import { publisherService } from "./publisher.service.js";
import { userService } from "./user.service.js";

export const postgresService = {userService, articleService, publisherService, authService}