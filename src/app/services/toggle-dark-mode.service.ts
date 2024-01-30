import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ToggleDarkModeService{
  private darkModeSubject = new BehaviorSubject<string>('true')
  public darkMode$: Observable<string> = this.darkModeSubject.asObservable()

  setColorMode = () => {
    if (typeof window !== 'undefined'){
      if (!localStorage.getItem('darkMode')){
        const deviceMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        localStorage.setItem('darkMode', `${deviceMode}`)
        let mode = localStorage.getItem('darkMode')
        this.darkModeSubject.next(mode ? mode : 'true')
      }
      let mode = localStorage.getItem('darkMode')
      this.darkModeSubject.next(mode ? mode : 'true')
      mode == 'true' ? document.body.classList.toggle('dark-theme') : document.body.classList.toggle('light-theme')
    }
  }

  toggleDarkMode = () => {
    if (typeof window !== 'undefined'){
      const newMode = !(this.darkModeSubject.value == 'true')
      this.darkModeSubject.next(newMode.toString())
      document.body.classList.toggle('dark-theme')
      localStorage.setItem('darkMode', newMode.toString())
    }
  }
}
