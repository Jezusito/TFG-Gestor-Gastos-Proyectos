import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any = new User();
  ownProjects: any = [];
  memberProjects: any = [];
  localStorageService = new LocalStorageService();
  editView: boolean = false;
  formGroup!: FormGroup;
  username: string | undefined;
  routeSub: any;
  owner: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.formGroup = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.owner = this.username == this.localStorageService.get('username');
    });

    if (this.username != undefined) {
      User.loadUser(this.username).then((response) => {
        this.user = response;
        this.formGroup.controls['first_name'].setValue(this.user.first_name);
        this.formGroup.controls['last_name'].setValue(this.user.last_name);
        if (this.owner) {
          this.user.getProjects().then((response: any) => {
            this.ownProjects = response;
          });
          this.user.getProjectsMember().then((response: any) => {
            this.memberProjects = response;
          });
        }
      });
    }
  }

  save() {
    this.user.first_name = this.formGroup.controls['first_name'].value;
    this.user.last_name = this.formGroup.controls['last_name'].value;
    this.user.save().then((response: any) => {
      if (response.hasOwnProperty('user_info')) {
        this.user = User.jsontoObject(response['user_info']);
        this.snackBar.open('Edit success', 'Close', {
          duration: 3 * 1000,
        });
        this.changeView();
      } else {
        console.log(response.data);
        this.snackBar.open('Error', 'Close', { duration: 3 * 1000 });
      }
    });
  }

  changeView() {
    this.editView = !this.editView;
  }
}
