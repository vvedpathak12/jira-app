import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { projectObject } from 'src/app/core/models/classes/classes';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectObj: projectObject = new projectObject();
  projectArr: any[] = [];
  isApiCallInProgress: boolean = false;
  displayModalProject: boolean = false;

  constructor(private _master: MasterService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadAllProjects();
  }

  loadAllProjects() {
    this._master.getAllProjects().subscribe((res: any) => {
      this.projectArr = res.data;
    })
  }

  onCreateProject() {
    this.displayModalProject = true;
  }

  onSaveProject() {
    if(!this.isApiCallInProgress){
      this.isApiCallInProgress = true;
      this._master.createProject(this.projectObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.loadAllProjects();
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
    this.projectObj = item;
    this.displayModalProject = true;
  }

  onUpdateProject() {
    if(!this.isApiCallInProgress){
      this.isApiCallInProgress = true;
      this._master.updateProject(this.projectObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.loadAllProjects();
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
    this._master.deleteProjectById(item.projectId).subscribe((res:any)=>{
      if(res.result){
        this.loadAllProjects();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
      }
    },(err:any)=>{
      this.isApiCallInProgress = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
    });
  }

  onCancel() {
    this.projectObj = new projectObject();
    this.displayModalProject = false;
  }

}
