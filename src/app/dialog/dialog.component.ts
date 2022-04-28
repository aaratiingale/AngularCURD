import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  userForm !: FormGroup;
  formlabel : String="Add User"
  actionbtn: String="SAVE"

  constructor(private formBuilder: FormBuilder, 
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      UserId: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      MobileNo: ['', Validators.required],
      Password: ['', Validators.required],
      Experience: ['', Validators.required],
      Address: ['', Validators.required],
      CVLinkDescription: ['', Validators.required],
      Education:['', Validators.required]
    })
    if(this.editData){
      this. actionbtn = "Update";
      this.formlabel = "Edit User"
      this.userForm.controls['UserId'].setValue(this.editData.userID);
      this.userForm.controls['FirstName'].setValue(this.editData.FirstName);
      this.userForm.controls['LastName'].setValue(this.editData.LastName);
      this.userForm.controls['Email'].setValue(this.editData.Email);
      this.userForm.controls['MobileNo'].setValue(this.editData.MobileNo);
      this.userForm.controls['Password'].setValue(this.editData.Password);
      this.userForm.controls['Experience'].setValue(this.editData.Experience);
      this.userForm.controls['Address'].setValue(this.editData.Address);
      this.userForm.controls['CVLinkDescription'].setValue(this.editData.CVLineDescription);
      this.userForm.controls['Education'].setValue(this.editData.Education);



    }

    
    
  }

  addUser(){
    console.log(this.userForm.value);
    if(!this.editData){
      if(this.userForm.valid){
        this.api.postUser(this.userForm.value)
        .subscribe({
          next:(res)=>{
            alert("User added successfully");
            this.userForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the user")
          }
        })
      }
    }else{
      this.updateUser()
    }
  }
  updateUser(){
    this.api.putUser(this.userForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("User updated successfully");
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record..!!")
      }

    })
  }

}