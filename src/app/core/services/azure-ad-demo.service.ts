import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { UserProfile } from '../models/user-profile.model';

const Graph_Endpoint = 'https://graph.microsoft.com/v1.0/me';
const Graph_Endpoint_Pic = 'https://graph.microsoft.com/v1.0/me/photo/$value';
@Injectable({
    providedIn: 'root'
})

export class AzureAdDemoService{
    isUserLoggedIn : Subject<boolean> = new Subject<boolean>();
    constructor(private httpClient: HttpClient){

    }

    getUserProfile(){
        return this.httpClient.get<UserProfile>(Graph_Endpoint);
    }

    getUserProfilePic(){
        return this.httpClient.get(Graph_Endpoint_Pic, {responseType: 'blob'});
    }
}