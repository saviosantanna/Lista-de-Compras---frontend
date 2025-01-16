import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})

export class SpinnerService {

  constructor(private overlay: Overlay) {}

  getSpinnerOverlayRef(): OverlayRef {
    // Criando a configuração do overlay
    const overlayRef: OverlayRef = this.overlay.create({
      hasBackdrop: true, // Exibe uma camada atrás do spinner
      backdropClass: 'backdrop', // Classe CSS para o backdrop
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically() // Posiciona no centro da tela
    });

    // Usando ComponentPortal para inserir o SpinnerComponent dentro do overlay
    overlayRef.attach(new ComponentPortal(SpinnerComponent));

    return overlayRef;
  }

  // constructor(private overlay: Overlay) {}

  // // Corrija o viewContainerRef para ser do tipo correto
  // getSpinnerOverlayRef(): OverlayRef {
  //   // Criando a configuração do overlay
  //   const overlayRef: OverlayRef = this.overlay.create();

  //   // Usando ComponentPortal para inserir o SpinnerComponent dentro do overlay
  //   overlayRef.attach(new ComponentPortal(SpinnerComponent)); // Aqui é importante passar o viewContainerRef correto

  //   return overlayRef;
  // }

}
