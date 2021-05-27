import { Category } from "./category";

export class Restaurant {
  
  constructor(

    public name: string,
    public image: string,
    public adresse: string,
    public cat_id:number,
    public id?: number,
  ){}
}
