import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Restaurant } from 'src/app/model/restaurant';
import { CategoryService } from 'src/app/services/category.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.page.html',
  styleUrls: ['./restaurant-add.page.scss'],
})
export class RestaurantAddPage  {

  ngForm: any;
  isSubmitted = false;
  indice : number


  constructor(
    public alertController: AlertController,
    public restoService: RestaurantService,
    private router : Router,
    private activatedRoute : ActivatedRoute,)
     {
      this.ngForm = {
        id :'',
        name: '',
        adresse:'',
        image :''
      };
    }

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe(idF=>{
      this.indice=parseInt(idF.id);

      })

      if(!isNaN(this.indice)){
        console.log("indice" , this.indice)
      }
  }

  async addRestaurant(f : NgForm){
    try{
      const restaurant = new Restaurant(f.value.name, f.value.image, f.value.adresse, this.indice);
      // console.log(JSON.stringify(restaurant));
      const  {err}=await this.restoService.addRestaurant(restaurant) as any;
      this.presentAlert()
      if(!err)
        console.log("added")
    }catch(err){}
  }

  noSubmit(e) {
    e.preventDefault();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'Ajout avec succée',
      buttons: ['OK']
    });

    await alert.present();
    this.router.navigate([`/category-detail/${this.indice}`])
  }
}
