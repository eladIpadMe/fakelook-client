import { User } from "./user.model";
import { Comment } from "./comment.model";

export interface UserTaggedComment{
    id: number;
    user: User;
    userId: number;
    comment: Comment;
    commentId: number;
}