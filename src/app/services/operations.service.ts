import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BlogContent } from '../components/interfaces/content';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { addDoc, collection, collectionData, doc, deleteDoc, Firestore, updateDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class OperationsService{
  contentRef = collection(this.firestore, 'posts')
  constructor(private firestore: Firestore, private storage: AngularFireStorage){}

  getAll = (): Observable<any[]> => {
    return collectionData(this.contentRef)
  }

  getPostById = async (postId: string): Promise<any> => {
    const getRef = doc(this.firestore, 'posts', postId)
    return await getDoc(getRef)
  }

  createPost = async (blogContent: BlogContent) => {
    const newDocRef = await addDoc(this.contentRef, { ...blogContent, banner: '', postId: '' })
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

  // Uploads image to firebase storage and return the image path
  storeImageUrl = (image: File): Promise<string> => {
    // Creates a unique image path for storage
    const filePath = `images/${Date.now()}/${image.name}`
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
}
