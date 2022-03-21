
import { Post } from "./post.model";
import { User } from "./user.model";

export interface Like{
    isActive?: boolean;
    id?: number;
    userId: number;
    user?: User;
    postId: number;
    post?: Post;
}