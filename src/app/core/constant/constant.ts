export const jira = {
  loginApiEndPoint: {
    Login: 'Login'
  },
  userApiEndPoint: {
    GetAllUsers: 'GetAllUsers',
    CreateUser: 'CreateUser',
    UpdateUser: 'UpdateUser',
    DeleteUserById: 'DeleteUserById?id='
  },
  projectApiEndPoint: {
    GetAllProjects: 'GetAllProjects',
    CreateProject: 'CreateProject',
    UpdateProject: 'UpdateProject',
    DeleteProjectById: 'DeleteProjectById?id='
  },
  ticketApiEndPoint: {
    GetAllTickets: 'GetAllTickets',
    GetTicketsByProjectId: 'GetTicketsByProjectId?projectid=',
    GetTicketsAssignedByUserId: 'GetTicketsAssignedByUserId?userId=',
    GetTicketById: 'GetTicketById?id=',
    CreateTicket: 'CreateTicket',
    UpdateTicket: 'UpdateTicket',
    DeleteTicketById: 'DeleteTicketById?id='
  }
}
