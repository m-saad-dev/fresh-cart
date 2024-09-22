import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, RendererFactory2, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectTranslateService {
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null,null);
  private readonly _TranslateService = inject(TranslateService);
  constructor() { 
    if(isPlatformBrowser(this._PLATFORM_ID)){ 
      let lang:string = this.getLocalStorageLang();
      this.updateLang(lang);
    }
  }

  getCurrentLang():string
  {
    return this._TranslateService.currentLang;
  }
  
  getLocalStorageLang():string
  {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      let lang:string|null = localStorage.getItem('lang');
      if(lang)
      {
        return lang;
      } else {
        this._TranslateService.setDefaultLang('en') 
        return 'en';
      }
    } else {
      return 'en';
    }
  }

  updateLang(lang:string){
    if(isPlatformBrowser(this._PLATFORM_ID)){
      localStorage.setItem('lang', lang);
      this._TranslateService.use( lang) 
      this.updateDirection();
    }
  }

  updateDirection():void
  {
    let lang = this.getCurrentLang();
    if(lang === 'en'){
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (lang === 'ar') {
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }
}
