import { Designation } from './../../../shared/employee.model';
import { EmployeeService } from './../../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/shared/employee.model';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(public empService: EmployeeService) { }

  ngOnInit(): void {
    this.empService.GetDesignation().subscribe(data => {
      this.empService.listDesignation = data;
    });
  }
  submit(form: NgForm) {
    console.log('event is wokring');
    this.empService.employeedata.isMarried = form.value.isMarried == true ? 1 : 0;
    this.empService.employeedata.isActive = form.value.isActive == true ? 1 : 0;

    if (this.empService.employeedata.id == 0) {
      this.insertEmployee(form);
    }
    else {
      this.updateEmployee(form);
    }
  }

  insertEmployee(myForm: NgForm) {
    myForm.value.designationID=Number( myForm.value.designationID);
    myForm.value.isMarried=Number( myForm.value.isMarried);
    myForm.value.isActive=Number( myForm.value.isActive);
    this.empService.employeedata=myForm.value;

    this.empService.SaveEmployee().subscribe(d => {
      this.resetForm(myForm);
      this.refreshData();
      console.log('save success');
    });
  }

  updateEmployee(myForm: NgForm) {
    console.log("data from update method",myForm.value);
    myForm.value.designationID = Number( myForm.value.designationID)
    this.empService.employeedata=myForm.value;
    this.empService.UpdateEmployee().subscribe(d => {


      this.resetForm(myForm);
      this.refreshData();
      console.log('Update success');
    });
  }

  resetForm(myForm: NgForm) {
    myForm.form.reset();
    this.empService.employeedata = new Employee();
  }

  refreshData() {
    this.empService.GetEmployee().subscribe(res => {
      this.empService.listEmployee = res;
    });
  }

}
