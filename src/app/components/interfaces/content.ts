export interface BlogContent{
  author: string,
  banner?: File | null,
  bannerUrl: string
  category: string,
  overview: string,
  postId: string;
  publishedDate: string,
  title: string,
  updatedDate: string,
}