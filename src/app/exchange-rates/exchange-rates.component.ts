import { Component, OnInit } from '@angular/core';

import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

const CurrentUserForProfile = gql`
  query CurrentUserForProfile($avatarSize: Int!) {
    currentUser {
      login
      avatar_url(avatarSize: $avatarSize)
    }
  }
`;

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit {
  rates:any[];
  loading: boolean;
  error:any;
  currentUser: any;

  private querySubscription: Subscription;

  

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.querySubscription = this.apollo
    .watchQuery({
      query: CurrentUserForProfile,
      variables: {
        avatarSize: 100,
      },
    })
    .valueChanges.subscribe(({data}) => {
      this.currentUser = data.currentUser;
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
