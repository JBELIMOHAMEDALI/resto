import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-restaurants-category',
  templateUrl: './restaurants-category.page.html',
  styleUrls: ['./restaurants-category.page.scss'],
})
export class RestaurantsCategoryPage implements OnInit{

  categories : Category[]
  constructor(private categoryService : CategoryService, private router : Router) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getAllCategrories((rows)=>{
      console.log(rows)
      this.categories = rows;
    });
  }
  goToAddCategory(){
    this.router.navigate(['/add-category'])
  }

  async getAllCategrories(callback){

    try {
      const {err,rows}=await this.categoryService.getAllCategorie()as any||[];
      if(!err){
        callback(rows);
      }

    } catch (error) {
      return error;

    }
  }
}
