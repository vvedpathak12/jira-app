import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { loginObject } from 'src/app/core/models/classes/classes';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginObj: loginObject;
  isApiCallInProgress: boolean;

  constructor(private _master: MasterService, private router: Router, private messageService: MessageService) {
    this.loginObj = new loginObject();
    this.isApiCallInProgress = false;
  }

  ngOnInit(): void {
  }

  onLogin() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._master.login(this.loginObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          debugger
          localStorage.setItem('jiraLoginDetails', JSON.stringify(res.data));
          this.router.navigateByUrl('board');
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        } else {
          this.isApiCallInProgress = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      });
    }

  }

}
