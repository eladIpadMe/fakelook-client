interface IPost{
id: number,
  description: string,
  imageSorce: string,
  x_Position: number,
  y_Position: number,
  z_Position: number,
  date: Date,
  likes: number | null,
  user:  null,
  userId: number,
  comments: string | null,
  tags: number | null,
  userTaggedPost: number | null
}



export default IPost 