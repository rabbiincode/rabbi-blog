import { Observable, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { BlogContent } from '../components/interfaces/content';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})

export class OperationsService{
  private dbPath = 'POSTS'
  contentRef!: AngularFireList<BlogContent>

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage){
    this.contentRef = db.list(this.dbPath)
  }

  getAll = (): Observable<any[]> => {
    return this.contentRef.valueChanges()
  }

  getPostById = (postId: string): Observable<any> => {
    return this.db.object(`${this.dbPath}/${postId}`).valueChanges()
  }

  createPost = (blogContent: BlogContent): Promise<void> => {
    const postId = this.db.createPushId() // Generate a unique ID
    // Create new post
    this.contentRef.push({ ...blogContent, postId: postId })
    return Promise.resolve()
  }

  updatePost = (postId: string, value: any): Promise<void> => {
    return this.contentRef.update(postId, value)
  }

  deletePost = (postId: string): Promise<void> => {
    if (!postId) {
      return Promise.reject("Invalid postId")
    }

    const postRef = this.db.object(`POSTS/${postId}`).valueChanges().pipe(
      // Use switchMap to switch to the remove operation
      switchMap(post => this.contentRef.remove(postId))
    )

    return postRef.toPromise()
    .catch(error => {
      console.error("Error deleting post:", error)
      throw error // Rethrow the error to handle it in the calling code
    })
  }

  storeImageUrl = (image: File): Promise<string> => {
    // Creates a unique image path for storage
    const filePath = `images/${image.name}`
    const fileRef = this.storage.ref(filePath)
    const upload = this.storage.upload(filePath, image)

    return new Promise((resolve, reject) => {
      upload.snapshotChanges().subscribe((snapshot: any) => {
        if (snapshot.state === 'success') {
          fileRef.getDownloadURL().subscribe((url) => {
            resolve(url);
          })
        }
      }, (error) => reject(error))
    })
  }
}
