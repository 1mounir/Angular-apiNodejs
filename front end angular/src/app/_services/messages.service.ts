import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { IGetMessageByIDResponse, IGetMessageCampaignByIDResponse, IGetMessageCampaignsResponse, IGetMessagesResponse } from '../../@core/api/messages/MessagesResponses';
//import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class MessagesService {
    constructor(private httpClient: HttpClient) { }

    /** */
    public getMessageCampaigns(partnerID?): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        let params = new HttpParams();
        if (partnerID) {
            params = params.append('partnerID', partnerID);
        }

        return this.httpClient.get<any>(`https://my-json-server.typicode.com/typicode/demo/posts`, {
            headers: headers,
            params,
        });
    }


 
    }
