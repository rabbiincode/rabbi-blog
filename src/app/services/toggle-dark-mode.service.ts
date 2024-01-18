import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ToggleDarkModeService{
  colorMode = 'false'
  setColorMode = () => {
    if (typeof window !== 'undefined'){
      if (!localStorage.getItem('colorMode')){
        const deviceMode = window.matchMedia('(prefers-color-scheme)').matches
        localStorage.setItem('colorMode', `${deviceMode}`)
        let mode = localStorage.getItem('colorMode')
        this.colorMode = mode ? mode : 'false'
      }
      let mode = localStorage.getItem('colorMode')
      this.colorMode = mode ? mode : 'false'
      mode == 'true' ? document.body.classList.toggle('light-theme') : document.body.classList.toggle('dark-theme')
    }
  }

  toggleDarkMode = () => {
    if (typeof window !== 'undefined'){
      this.colorMode = this.colorMode == 'true' ? this.colorMode = 'false' : this.colorMode = 'true' 
      document.body.classList.toggle('dark-theme')
      localStorage.setItem('colorMode', this.colorMode)
    }
  }
}
