import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Restaurant } from 'src/app/model/restaurant';
import { CategoryService } from 'src/app/services/category.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.page.html',
  styleUrls: ['./category-detail.page.scss'],
})
export class CategoryDetailPage implements OnInit {

  indice : number;
  category : any;

  list_restaurants : Restaurant[]

  constructor(
    private categoryService : CategoryService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private restaurantService : RestaurantService
    ){    }
  ngOnInit() {
    
    this.activatedRoute.params.subscribe(idF=>{
      this.indice=parseInt(idF.id);

      })

      if(!isNaN(this.indice)){
        console.log("indice" , this.indice)
      }

      this.getOneCategory((rows)=>{
        this.category = rows[0]
        console.log(this.category.name)
      })


  }

  ionViewWillEnter(){
    this.getAllRestaurantOfCategory((rows)=>{
      this.list_restaurants = rows
      console.log(rows);
      
    })
  }
  

  async getOneCategory(callback){

    try {
      const {err,rows}=await this.categoryService.getOneCategorie(this.indice) as any||[]  ;
      if(!err){
        callback(rows);
      }

    } catch (error) {
      return error;

    }
  }

  async getAllRestaurantOfCategory(callback){
    try{
      const {err,rows} = await this.restaurantService.getAllRestaurants(this.indice) as any ||[];
      console.log(rows.length)
      if(!err){

        if(rows.length>0){
          return callback(rows);
        }else{
  
          return callback([])
        }
      }
    }catch(error){
      return []
    }
  }






  showDetail(resto : Restaurant){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(resto)
      }
    };
    this.router.navigate(['/restaurants-details'], navigationExtras);
  }
}
