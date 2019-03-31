import { Injectable } from '@angular/core';
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]>{
    return Promise.resolve(DISHES);
  }

  getDish(id:string): Promise<Dish>{
   let returnedDish: Dish;
   for (let dish of DISHES){
      if(dish.id === id){
        returnedDish = dish;
      }
   }
   return Promise.resolve(returnedDish);
  }

/*
getDish(id:string): Dish{
  return DISHES.filter((dishX)=>{
        (dishX.id === id)
      })[0];
}
  */

  // getDish(id:string): Dish{
  //   return DISHES.filter( function(bob){
  //     return bob.id === id;
  //   })[0];
  // }

  getFeaturedDish(): Promise<Dish>{
      return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }
}
