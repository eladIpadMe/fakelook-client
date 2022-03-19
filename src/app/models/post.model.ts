import { Like } from "./like.model";
import { User } from "./user.model";
import { Comment } from "./comment.model";

export interface Post{
    description: string;
    imageSorce: string;
    x_position: number;
    y_position: number;
    z_position: number;
    date: Date;
    user: User;
    likes: Like[];
    comments: Comment[];
}