import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpC : HttpClient) { }

  addRestaurant(restaurant : Restaurant){
    return new Promise((resolve, reject) => {
      console.log(restaurant)
      this.httpC.post('http://localhost:3010/restaurant/add', restaurant)
        .forEach(data =>{
          //console.log(data)
          resolve(data)
        }
        ).catch((err) => {
          console.log(err)
          reject(err);
        });
    });
  }
  getAllRestaurants(index : number){
    return new Promise((resolve, reject) => {
      this.httpC.get(`http://localhost:3010/restaurant-list/${index}`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });
  }

  deleteRestaurants(id : number){
    return new Promise((resolve, reject) => {
      this.httpC.delete(`http://localhost:3010/delete-restaurant/${id}`)
        .forEach(data =>
          {
            resolve(data)
          }
        ).catch((err) => {
          reject(err);
        });
    });
  }



}
