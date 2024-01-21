export interface BlogContent{
  author: string,
  banner?: File | null,
  bannerUrl: string
  category: string,
  content: string,
  overview: string,
  postId: string;
  publishedDate: string,
  title: string,
  updatedDate: string,
}

export interface Quote{
  quote: string,
  quoteId: string;
}