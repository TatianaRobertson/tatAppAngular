import { Injectable } from '@angular/core';
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]>{
    return  new Promise(resolve => {
      //simulate server delay of 2 seconds
      setTimeout(() => resolve(DISHES),2000);
    });
  }

  getDish(id:string): Promise<Dish>{
   let returnedDish: Dish;
   for (let dish of DISHES){
      if(dish.id === id){
        returnedDish = dish;
      }
   }
  // return Promise.resolve(returnedDish);
   return new Promise(resolve => {
     //simulate server delay of 2 seconds
      setTimeout(() => resolve(returnedDish),2000);
    });
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
      //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
      return  new Promise(resolve => {
        //simulate server delay of 2 seconds
        setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]),2000);
      });
  }
}
