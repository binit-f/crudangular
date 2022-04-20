import { Employee } from './../../shared/employee.model';
import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(public empService:EmployeeService) { }

  ngOnInit(): void {

    this.empService.GetEmployee().subscribe(data=>{
     this.empService.listEmployee=data;

    })
  }

  PopulateEmployee(SelectedEmployee:Employee)
  {
    console.log(SelectedEmployee);

    this.empService.employeedata=SelectedEmployee;
  }

  deleteEmployee(id:number)
  {
    if(confirm('are you sure uou want to delete'))
    {
  this.empService.DeleteEmployee(id).subscribe(data=>{
    console.log('RECORD DELETED....');
    this.empService.GetEmployee().subscribe(data=>{
      this.empService.listEmployee=data;
    });
  },
  err=>{
    console.log('RECORD NOT DELETED..');
  });
    }
  }
}
