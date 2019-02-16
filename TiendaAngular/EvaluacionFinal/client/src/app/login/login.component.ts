import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private httpService : HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onlogin(){
    this.httpService.getDatosUsuarios(this.model)
      .then(data => {        
        if(data.respuesta == "Validado"){
          this.router.navigate(['/main']);
        }else {
          alert(data.respuesta);
        }
      })
      .catch(error => console.log(error));
  }
}
