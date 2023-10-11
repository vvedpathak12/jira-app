import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { jira } from '../constant/constant';
import { loginObject } from '../models/classes/classes';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl: string = environment.apiUrl;
  public onProjectChange = new Subject();
  public onTicketCreate = new Subject();

  constructor(private http: HttpClient) { }

  login(obj: loginObject): Observable<loginObject> {
    return this.http.post<loginObject>(this.apiUrl + jira.loginApiEndPoint.Login, obj);
  }

  // User
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + jira.userApiEndPoint.GetAllUsers);
  }

  createUser(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + jira.userApiEndPoint.CreateUser, obj);
  }

  updateUser(obj: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + jira.userApiEndPoint.UpdateUser, obj);
  }

  deleteUserById(id: number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl + jira.userApiEndPoint.DeleteUserById + id);
  }

  // Project
  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + jira.projectApiEndPoint.GetAllProjects);
  }

  createProject(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + jira.projectApiEndPoint.CreateProject, obj);
  }

  updateProject(obj: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + jira.projectApiEndPoint.UpdateProject, obj);
  }

  deleteProjectById(id: number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl + jira.projectApiEndPoint.DeleteProjectById + id);
  }

  // Ticket
  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + jira.ticketApiEndPoint.GetAllTickets);
  }

  getTicketsByProjectId(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + jira.ticketApiEndPoint.GetTicketsByProjectId + id);
  }

  getTicketsAssignedByUserId(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + jira.ticketApiEndPoint.GetTicketsAssignedByUserId + id);
  }

  getTicketById(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + jira.ticketApiEndPoint.GetTicketById + id);
  }

  createTicket(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + jira.ticketApiEndPoint.CreateTicket, obj);
  }

  updateTicket(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + jira.ticketApiEndPoint.UpdateTicket, obj);
  }

  deleteTicketById(id: number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl + jira.ticketApiEndPoint.DeleteTicketById + id);
  }
}
