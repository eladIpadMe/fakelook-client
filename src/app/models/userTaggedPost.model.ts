import { Post } from "./post.model";
import { User } from "./user.model";


export interface UserTaggedPost{
    id: number;
    user: User;
    userId: number;
    post: Post;
    postId: number;
}