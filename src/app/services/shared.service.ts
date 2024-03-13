import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedVariable = new BehaviorSubject<string>('');
  sharedVariable$ = this.sharedVariable.asObservable();

  constructor() { }

  updateVariable(newValue: string) {
    this.sharedVariable.next(newValue);
  }
}
