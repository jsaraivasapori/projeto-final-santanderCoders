import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Constants } from '../../commons/constants/constants.enum';


//NÃO ESQUECER DE PROVER A APLICAÇÃO COM O INTERCEPTOIR EM APP.CONFIG.TS LA EM PROVIDERS

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Filtra pela url as requisiçoes que nao precisam de atenticação quer é auth/login e auth/register
  if (req.url.includes('/auth')) {
    
    return next(req); // passa para frente a requisiçao atual se existir mais um  interceptor, a requisiçao é passada para ele
  }


  const token = localStorage.getItem(Constants.TOKEN_KEY) || '';

  if (!token) { //se n existir o token  passa para frente, ou seja se token for null (retorno do getItem)
    return next(req);
  }

  //Preciso sempre criar uma cópia da request. ela originalmente é imutável
  const newReq = req.clone({
    setHeaders: {
      Authorization: token,
    },
  });

// pipe intercepta o retorno do next

  return next(newReq).pipe(
    catchError((err: any) => {
      if (err.status === 401 || err.status === 403) {
        console.error(err.error.message);
        router.navigate(['auth', 'login']);
      }


      return throwError(() => err);
    })
  );
};
