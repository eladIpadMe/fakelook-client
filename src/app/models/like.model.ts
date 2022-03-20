
import { Post } from "./post.model";
import { User } from "./user.model";

export interface Like{
    isActive: boolean;
    userId: number;
    user?: User;
    postId: number;
    post?: Post;
}