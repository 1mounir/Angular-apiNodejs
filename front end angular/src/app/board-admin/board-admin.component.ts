import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/event.class';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: any;
  msg: any;

  constructor(private userService: UserService, private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
      
        this.content =  JSON.parse(data).rows;
        
        
      },
      err => {
        this.content = err.error.message || err.error || err.message;

        if (err.status === 403)
          this.eventBusService.emit(new EventData('logout', null));
      }
    );
  }
  deleteUser(id: any):void{
    this.userService.deletUser(id).subscribe(
      data => {
     //   console.log(this.content);
      //  this.msg =  JSON.parse(data).rows;
        
        this.reloadPage();
      },
      err => {
        this.msg = err.error.message || err.error || err.message;

        if (err.status === 403)
          this.eventBusService.emit(new EventData('delete', null));
      }
    )
  }

  Edit(id:any):void{
   //this.userService.
  }
  reloadPage(): void {
    window.location.reload();
  }
}
