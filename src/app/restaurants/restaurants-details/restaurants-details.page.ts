import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurants-details',
  templateUrl: './restaurants-details.page.html',
  styleUrls: ['./restaurants-details.page.scss'],
})
export class RestaurantsDetailsPage implements OnInit {

  input_data : Restaurant

  constructor(  public alertController: AlertController,private route: ActivatedRoute, private router: Router,private servicerestaurants:RestaurantService) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.input_data = JSON.parse(params.special);
      //  console.log('test', this.input_data)
      }
    });
   }
   ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.input_data = JSON.parse(params.special);
      //  console.log('test', this.input_data)
      }
    });
   }


   async delete_fn(id:number){
    try{
      // console.log(JSON.stringify(restaurant));
      const  {err}= await this.servicerestaurants.deleteRestaurants(id) as any;
     
      if(!err)
        console.log("deleted");

        this.presentAlert();
    }catch(err){}
  }
  // ngOnDestroy() {
  //   this.router.navigate([`/category-detail/${this.input_data.cat_id}`])

  // }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'Delete Done',
      buttons: ['OK']
    });

    await alert.present();
    this.router.navigate([`/category-detail/${this.input_data.cat_id}`])
  }
  ngOnInit() {
  }

}
