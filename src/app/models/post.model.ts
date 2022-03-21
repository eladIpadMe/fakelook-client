export interface Post{
    id?: string,
    description: string,
    imageSorce: string,
    x_Position: number,
    y_Position: number,
    z_Position: number | null,
    date?: Date,
    userId: number
}