import { User } from "./user.model";

export interface Post{
    description: string;
    imageSorce: string;
    x_position: number;
    y_position: number;
    z_position: number;
    date: Date;
    user: User;
}