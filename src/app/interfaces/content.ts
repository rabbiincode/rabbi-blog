export interface PostContent{
  author: string
  banner?: File | null
  bannerUrl: string
  category: string
  content: string
  overview: string
  postId: string
  publishedDate: string
  title: string
  updatedDate: string
  likeCount?: number
  dislikeCount?: number
  liked?: string[]
  disliked?: string[]
}

export interface Comments{
  author: string
  postId: string
  comment: string
  commentId: string
  liked: string[]
  disliked: string[]
  likedCommentCount: number
  dislikedCommentCount: number
}

export interface Quote{
  quote: string
  quoteId: string
}