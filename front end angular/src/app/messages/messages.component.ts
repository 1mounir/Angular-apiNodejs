import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, AfterViewChecked, AfterContentChecked, AfterContentInit } from '@angular/core';
import { MessagesService } from '../_services/messages.service';
import { Router } from '@angular/router';
//import { Message, MessageCampaign } from '../../@core/data/Message';
//import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';

@Component({
    selector: 'ngx-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit{

    public messageCampaigns:any[] = [];
  //  public myLength = this.messageCampaigns.length;
    public loading = false;
    public isClient = false;
    public isPartner = false;
    public isAdmin = false;
    public test: any;
    // ngAfterViewInit(){
    //     const mouseoverEvent = new Event('mouseenter');

    //     setTimeout(()=>{

    //         document.elementFromPoint(50, 120).dispatchEvent(mouseoverEvent);
    //     }, 500);
    //     setTimeout(()=>{
    //         document.elementFromPoint(50, 120).dispatchEvent(mouseoverEvent);
    //     }, 510);
    // }

    isDataLoaded:any = false;
    settings = {
        mode: 'external',
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: {
            title: {
                title: 'Title',
            },
            messages: {
                title: 'Sent To',
                valuePrepareFunction: (messages: any[]) => {
                    let delivered = messages.filter(m => m.status === 'delivered');
                    let deliveredNotificationsOff = messages.filter(m => m.status === 'delivered_notifications_off');
                    let read = messages.filter(m => m.status === 'read' || m.status === 'read_deleted');
                    let pending = messages.filter(m => m.status === 'pending');
                    let inactive = messages.filter(m => m.status === 'inactive');
                    return `${messages.length} Salespeople: ${pending.length} PENDING ${read.length} READ ${delivered.length} DELIVERED  ${inactive.length} INACTIVE ${deliveredNotificationsOff.length} DELIVERED_Notifications Off`
                }
            },
            sender: {
                title: 'From',
                valuePrepareFunction: sender => sender.username,
            },
            organizations: {
                title: 'Clients',
                valuePrepareFunction: organizations => (organizations.map(c => c.name)).join(','),
            },
            createdAt: {
                title: 'Time Sent',
                valuePrepareFunction: date => new Date(date).toLocaleString(),
            },
        },
    };

    partnerID:any;

    constructor(private messagesService: MessagesService,
        private router: Router
        ) {
            
            

            this.loading = true;
            this.partnerID = null;
       
           
         }
    ngOnInit() {
        
        // this.authService.getToken().subscribe(token => {
        //     console.log('helllow');
        //     const organization = token.getPayload()
        //         .user.organizations;
               
        //     // User is not an admin
        //     if (organization.length > 0) {
        //         this.isClient = organization[0]
        //             .user_organizations
        //             .access_level === 'admin1';

        //         this.isPartner = organization[0]
        //             .user_organizations
        //             .access_level === 'admin2';

        //         delete this.settings.columns.organizations;
        //     } else {
        //         this.isAdmin = true;
        //     }

        //     if (this.isClient || this.isAdmin) {
        //         delete this.settings.columns.sender;
                

        //     }

        //     if (this.isPartner) {
        //         this.partnerID = organization[0].id;

        //     }

           
        // });

        this.messagesService.getMessageCampaigns(0)
        .subscribe(res => {
            console.log('hisssss');
         //   this.messageCampaigns = res.data;
            console.log('hisssss2');
            this.test='heeeeelo';
          //  console.log(organization[0]);
        }, err => console.log(err),
            () => this.loading = false);

      //  this.getMessageCampaigns(this.partnerID);

    }



    public onUserRowSelect(event) {
        console.log(event);
        let messageID = event.data.id
        this.router.navigateByUrl(`/pages/message-details/${messageID}`);
    }

    public goToCreateMessage() {
        this.router.navigateByUrl('/pages/create-message');
    }

    /**
    * exportToExcel
    */
    // public exportToExcel() {
    //     this.messagesService.exportExcel()
    //         .subscribe(res => {
    //             const blob = new Blob([res], { type: 'application/ms-excel' });
    //             const a = document.createElement('a');

    //             // Create a DOMString representing the blob
    //             // and point the link element towards it
    //             const url = window.URL.createObjectURL(blob);
    //             a.href = url;
    //             a.download = 'Messages.xlsx';

    //             // Programatically click the link to trigger the download
    //             a.click();

    //             // let pwa = window.open(url)
    //             // if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
    //             //     alert('Please disable your Pop-up blocker and try again.')
    //             // }
    //         });

    // }

    private getMessageCampaigns(partnerID:any) {
        this.messagesService.getMessageCampaigns(partnerID)
            .subscribe(res => {
                this.messageCampaigns = res.data;
            }, err => console.log(err),
                () => this.loading = false);
    }
}
