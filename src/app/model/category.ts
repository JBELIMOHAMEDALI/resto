import { Restaurant } from "./restaurant";

export class Category {
  private name: string;
  private image: string;
  private id?: number

  constructor(
     name: string,
    image: string,
    id?: number
  ){ 
    this.name=name;
    this.image=image;
   }
}
