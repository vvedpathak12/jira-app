import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ticketObject } from 'src/app/core/models/classes/classes';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  ticketObj: ticketObject = new ticketObject();
  displayModalCreateTicket: boolean = false;
  issueTypes: string[] = ['Epic', 'Task', 'Story', 'Bug'];
  status: string[] = ['To Do', 'In Progress', 'Done'];
  projectArr: any[] = [];
  userArr: any[] = [];
  isApiCallInProgress: boolean = false;

  constructor(private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private _master: MasterService) {
    const loginData = localStorage.getItem('jiraLoginDetails');
    if (loginData != null) {
      const parsedData = JSON.parse(loginData);
      this.ticketObj.createdBy = parsedData.userId;
    }
  }

  ngOnInit(): void {
    this.loadAllProjects();
    this.loadAllUsers();
  }

  onCreateNewTicket() {
    this.displayModalCreateTicket = true;
    this.ticketObj = new ticketObject();
  }

  loadAllProjects() {
    this._master.getAllProjects().subscribe((res: any) => {
      this.projectArr = res.data;
      this._master.onTicketCreate.next(this.projectArr[0]);
    })
  }

  loadAllUsers() {
    this._master.getAllUsers().subscribe((res: any) => {
      this.userArr = res.data;
    })
  }

  setProject(project: any){
    this._master.onProjectChange.next(project);
  }

  onSaveTicket() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._master.createTicket(this.ticketObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this._master.onTicketCreate.next(true);
          this.onCancel();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      });
    }
  }

  onUpdateTicket() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this._master.updateTicket(this.ticketObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this._master.onTicketCreate.next(true);
          this.onCancel();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      });
    }
  }

  onCancel() {
    this.ticketObj = new ticketObject();
    this.displayModalCreateTicket = false;
  }

  onLogOut() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want log out?',
      accept: () => {
        localStorage.removeItem('jiraLoginDetails');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged Out Successfully' });
        this.router.navigateByUrl('login');
      }
    });
  }

}
