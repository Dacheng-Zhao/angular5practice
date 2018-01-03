export class Recipe{
    public name: string;
    public description: string;
    public imagePath:string;
    constructor(name:string,desc:string,imagePath:string){
      let vm = this;
      vm.name = name;
      vm.description = desc;
      vm.imagePath = imagePath;
    }
}
