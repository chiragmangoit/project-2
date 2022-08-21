import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }
  emitGovernance = new BehaviorSubject<any>(1);
  header = new BehaviorSubject<boolean>(false);
}
