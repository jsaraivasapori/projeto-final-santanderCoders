import { HttpInterceptorFn } from '@angular/common/http';
import { Constants } from '../../commons/constants/constants.enum';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router)
  
  if(req.url.includes('/auth')){ //Se for uma rota q n precisa de autenticação, encerra aqui
    return next(req)
    
  }

  const token = localStorage.getItem(Constants.TOKEN_KEY) || ''

  //Se não existir o token encerra a função neste bloco:

  if(!token){
    return next(req)
  }

  const newReq  = req.clone({
    setHeaders:{
      Authorization: token
    }
  })


  return next(newReq).pipe(
    catchError((err:any) => {
      if(err.status === 401 || err.status === 403){
        console.error(err.error.message)
        router.navigate(['auth','login'])
      }

      return throwError(() => err)
    })
  )
};
