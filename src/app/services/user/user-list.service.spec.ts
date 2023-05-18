import { TestBed } from '@angular/core/testing';

import { UserListService } from './user-list.service';
import {MatSnackBar} from "@angular/material/snack-bar";

describe('UserListService', () => {
  let service: UserListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        MatSnackBar
      ]
    });
    service = TestBed.inject(UserListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
