import { Injectable } from '@angular/core';
import { Observable, forkJoin, mergeMap } from 'rxjs';
import { PostContent, Comments } from '../interfaces/content';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { addDoc, collection, collectionData, doc, deleteDoc, Firestore, updateDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class OperationsService{
  quoteRef = collection(this.firestore, 'quote')
  contentRef = collection(this.firestore, 'posts')
  commentRef = collection(this.firestore, 'comments')
  constructor(private firestore: Firestore, private storage: AngularFireStorage){}

  getAllPosts = (): Observable<any[]> => {
    return collectionData(this.contentRef)
  }

  getPostById = async (postId: string): Promise<any> => {
    const getRef = doc(this.firestore, 'posts', postId)
    return await getDoc(getRef)
  }

  createPost = async (postContent: PostContent) => {
    const newDocRef = await addDoc(this.contentRef, { ...postContent, banner: '', postId: '', likeCount: 0, dislikeCount: 0, liked: [], disliked: [] })
    return await updateDoc(newDocRef, { postId: newDocRef.id })
  }

  updatePost = async (postId: string, value: any): Promise<void> => {
    const updateDocRef = doc(this.contentRef, postId)
    return await updateDoc(updateDocRef, value)
  }

  deletePost = async (postId: string) => {
    const deleteDocRef = doc(this.contentRef, postId)
    return await deleteDoc(deleteDocRef)
  }

  getAllQuote = (): Observable<any[]> => {
    return collectionData(this.quoteRef)
  }

  createQuote = async (quote: string) => {
    const newDocRef = await addDoc(this.quoteRef, { quote })
    return await updateDoc(newDocRef, { quoteId: newDocRef.id })
  }

  updateQuote = async (quoteId: string, value: any): Promise<void> => {
    const updateDocRef = doc(this.quoteRef, quoteId)
    return await updateDoc(updateDocRef, value)
  }

  deleteQuote = async (quoteId: string) => {
    const deleteDocRef = doc(this.quoteRef, quoteId)
    return await deleteDoc(deleteDocRef)
  }

  getAllComments = (): Observable<any[]> => {
    return collectionData(this.commentRef)
  }

  createComment = async (comment: Comments) => {
    const newDocRef = await addDoc(this.commentRef, comment)
    return await updateDoc(newDocRef, { commentId: newDocRef.id })
  }

  updateComment = async (commentId: string, value: any): Promise<void> => {
    const updateDocRef = doc(this.commentRef, commentId)
    return await updateDoc(updateDocRef, value)
  }

  deleteComment = async (commentId: string) => {
    const deleteDocRef = doc(this.commentRef, commentId)
    return await deleteDoc(deleteDocRef)
  }

  // Uploads image to firebase storage and return the image path
  storeImageUrl = (imagePath: string, image: File): Promise<string> => {
    // Creates a unique image path for storage
    const filePath = `${imagePath}/${Date.now()}/${image.name}`
    const fileRef = this.storage.ref(filePath)
    const upload = this.storage.upload(filePath, image)

    return new Promise((resolve, reject) => { 
      upload.snapshotChanges().subscribe((snapshot: any) => {
        if (snapshot.state === 'success') {
          fileRef.getDownloadURL().subscribe((url) => {
            resolve(url)
          })
        }
      }, (error) => reject(error))
    })
  }

  getAllImageUrls = (): Observable<string[]> => {
    const storageRef = this.storage.ref('site-images')
    return storageRef.listAll().pipe(
      mergeMap(result => {
        const downloadURLPromises = result.items.map(item => item.getDownloadURL())
        return forkJoin(downloadURLPromises)
      })
    )
  }

  deleteImage = (path: string) => {
    const fileRef = this.storage.ref(path)
    return fileRef.delete()
  }
}
