import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { userObject } from 'src/app/core/models/classes/classes';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userObj: userObject = new userObject();
  userArr: any[] = [];
  isApiCallInProgress: boolean = false;
  displayModalUser: boolean = false;

  constructor(private _master: MasterService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this._master.getAllUsers().subscribe((res: any) => {
      this.userArr = res.data;
    })
  }

  onCreateUser() {
    this.displayModalUser = true;
  }

  onSaveUser() {
    if(!this.isApiCallInProgress){
      this.isApiCallInProgress = true;
      this._master.createUser(this.userObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.loadAllUsers();
          this.onCancel();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        }
      },(err:any)=>{
        this.isApiCallInProgress = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      });
    }
  }

  onEdit(item:any) {
    this.userObj = item;
    this.displayModalUser = true;
  }

  onUpdateUser() {
    if(!this.isApiCallInProgress){
      this.isApiCallInProgress = true;
      this._master.updateUser(this.userObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.loadAllUsers();
          this.onCancel();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        }
      },(err:any)=>{
        this.isApiCallInProgress = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      });
    }
   }

  onDelete(item:any) {
    this._master.deleteUserById(item.userId).subscribe((res:any)=>{
      if(res.result){
        this.loadAllUsers();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
      }
    },(err:any)=>{
      this.isApiCallInProgress = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
    });
  }

  onCancel() {
    this.userObj = new userObject();
    this.displayModalUser = false;
  }

}
