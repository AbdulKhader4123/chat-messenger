import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {

  username = "";
  groupId="";
  submitted=false;
  createForm :FormGroup;
  constructor(private formbuilder :FormBuilder,private router:Router) { }

  ngOnInit() {
this.createForm=this.formbuilder.group({
  username:["",Validators.required],
  groupId: ['', Validators.required]
})
  }
  invalidUserName()
  {
  	return (this.submitted && this.createForm.controls.username.errors != null);
  }

  invalidGroupId()
  {
  	return (this.submitted && this.createForm.controls.groupId.errors != null);
  }
 
  onSubmit(){
    this.submitted=true;
    if(this.createForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
      this.router.navigate(['/join'],{ queryParams: { username: this.username,id:this.groupId} });
    }
  }
}
