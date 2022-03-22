import { Like } from "./like.model";
import { User } from "./user.model";
import { Comment } from "./comment.model";
import { Tag } from "./tag.model";

export interface Post{
    id?: number;
    description: string;
    imageSorce: string;
    x_Position: number;
    y_Position: number;
    z_Position: number | null;
    date: Date;
    user?: User;
    userId: number;
    likes?: Like[];
    comments?: Comment[];
    hashtags?: Tag[];   
}