
import { Post } from "./post.model";
import { User } from "./user.model";

export interface Like{
    isActive: boolean;
    user: User;
    post: Post;
}