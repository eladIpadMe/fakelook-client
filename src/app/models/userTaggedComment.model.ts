import { User } from "./user.model";
import { Comment } from "./comment.model";

export interface UserTaggedComment{
    userId: number;
    user?: User;
}