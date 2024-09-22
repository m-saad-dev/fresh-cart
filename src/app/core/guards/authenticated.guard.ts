import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _PLATFORM_ID = inject(PLATFORM_ID);
  if(isPlatformBrowser(_PLATFORM_ID) &&  localStorage.getItem('token')){
    _Router.navigate(['/home'])
    return false;
  } else if (isPlatformBrowser(_PLATFORM_ID)){
    return true;
  } else {
    return false;
  }
};
