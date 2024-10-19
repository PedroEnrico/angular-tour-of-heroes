import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // gerencia o estado interno do componente e não deve ser acessada diretamente de fora.
  // quando um componente se inscrever (subscribe) recerá o valor inicial(false)
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Converte o BehaviorSubject em um Observable regular que outros componentes podem se inscrever.
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  hide(): void {
    // Emite um novo valor para o loadingSubject informando todos componentes.
    this.loadingSubject.next(false);
  }

  show(): void {
    // Emite um novo valor para o loadingSubject informando todos componentes.
    this.loadingSubject.next(true);
  }
}
