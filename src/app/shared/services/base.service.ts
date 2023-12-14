import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from 'src/environments/environment';

interface RestServiceAtributs {
  endpoint: string;
}

export interface PaginationQuery {
  numeroPagina: number;
  tamanhoPagina: number;
}

export abstract class BaseService {

  constructor( {endpoint}: RestServiceAtributs ) {
    this.UrlServiceV1 = environment.apiUrlv1 + `${endpoint}`;
  }

  protected UrlServiceV1: string;

  protected ObterHeaderJson() {
      return {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  protected serviceError(response: Response | any) {
      let customError: string[] = [];
      let customResponse = { error: { errors: [{}] }}

      if (response instanceof HttpErrorResponse) {

          if (response.statusText === "Unknown Error") {
              customError.push("Ocorreu um erro desconhecido");
              response.error.errors = customError;
          }
      }
      if (response.status === 500) {
          customError.push("Ocorreu um erro no processamento, tente novamente mais tarde.");

          customResponse.error.errors = customError;
          return throwError(() => customResponse);
      }

      return throwError(() => response);
  }
}
