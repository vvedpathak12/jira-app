import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  ticketsArray: any[] = [];
  status: string[] = ['To Do', 'In Progress', 'Done'];
  currentItem: any;
  selectedProjectData: any;

  constructor(private _master: MasterService) {
    this._master.onProjectChange.subscribe((res: any) => {
      this.getTicketsByProjectId(res.projectId);
      this.selectedProjectData = res;
    });
    this._master.onTicketCreate.subscribe((res: any) => {
      this.getTicketsByProjectId(res.projectId);
      this.selectedProjectData = res
    })
  }

  ngOnInit(): void {
  }

  getTicketsByProjectId(id: number) {
    this._master.getTicketsByProjectId(id).subscribe((res: any) => {
      this.ticketsArray = res.data;
    })
  }

  filterByStatus(status: string) {
    return this.ticketsArray.filter((m: any) => m.status === status);
  }

  onDragStart(item: any) {
    console.log('onDragStart');
    this.currentItem = item;
  }

  onDrop(event: any, status: string) {
    console.log('onDrop');
    event.preventDefault();
    const record = this.ticketsArray.find((m: any) => m.ticketId === this.currentItem.ticketId);
    if (record != undefined) {
      record.status = status;
    }
    this.currentItem = null;
  }

  onDragOver(event: any) {
    console.log('onDragOver');
    event.preventDefault();
  }

}
