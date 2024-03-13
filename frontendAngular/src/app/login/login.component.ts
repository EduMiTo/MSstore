import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authService/auth-service.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user:any;
  loggedIn: any;

  message:string;
  error=false;
  
  constructor(private authenticationService : AuthenticationService, private router: Router, private socialAuthService: SocialAuthService, private navBar: NavbarComponent) { 
    
      this.message="";

  }

  ngOnInit() {

    if (localStorage.getItem('token') != null){
      if(this.authenticationService.roleMatch(['d29f8f05-96af-4a72-ba65-d3e13e1d99a0'])){
        this.router.navigateByUrl('/create');
      }else {
        this.router.navigateByUrl('/home');
      }  
      this.navBar.verifyName();

    }
  
    this.socialAuthService.authState.subscribe((data: any) => {


      const email = data.email;
      this.authenticationService.verifyIfUserExists(email).subscribe((user: any) => {

        localStorage.setItem('token', user.token);
        var id = this.getId();
        localStorage.setItem('id', id);
        if(this.authenticationService.roleMatch(['d29f8f05-96af-4a72-ba65-d3e13e1d99a0'])){
          this.router.navigateByUrl('/create');
        }else {
          this.router.navigateByUrl('/home');
        }   
        this.navBar.verifyName();

    },
      err => {
        this.error = true;
        this.message = "Username or password is incorrect";
      });
    });
};
  


  getId(): string {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1] ));
    var userId = payLoad.UserID;
    return userId;
  }

  loginUser(email: string, password: string){
    this.authenticationService.login(email, password).subscribe((data : any) => {
      localStorage.setItem('token', data.token);
      var id = this.getId();
      localStorage.setItem('id', id);
      if(this.authenticationService.roleMatch(['d29f8f05-96af-4a72-ba65-d3e13e1d99a0'])){
        this.router.navigateByUrl('/create');
      }else {
        this.router.navigateByUrl('/home');
      } 
      this.navBar.verifyName();

  },
    err => {
      this.error = true;
      this.message = "Username or password is incorrect";
    });

  }

  }


