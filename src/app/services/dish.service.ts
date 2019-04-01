import { Injectable } from '@angular/core';
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]>{
    //return  of(DISHES).pipe(delay(2000)).toPromise();
     return of(DISHES).pipe(delay(2000));
  }

   getDish(id:string): Observable<Dish>{
    let returnedDish: Dish;
    for (let dish of DISHES){
       if(dish.id === id){
         returnedDish = dish;
       }
    }
    return  of(returnedDish).pipe(delay(2000));
   }

/*  getDish(id: number): Promise<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
  }
*/
  getFeaturedDish(): Observable<Dish>{
      //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
          return  of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
}
