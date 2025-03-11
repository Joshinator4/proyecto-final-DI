import { Component } from '@angular/core';

@Component({
  selector: 'app-error404-page',
  templateUrl: './error404-page.component.html',
})
export class Error404PageComponent {

  get errorImage(){
    return "https://miro.medium.com/v2/resize:fit:924/1*ZvwdIQkolJ2z1MILFrQjOQ.jpeg"
  }

}
