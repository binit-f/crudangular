import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Designation, Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {



  constructor(private myhttp:HttpClient) {


   }
   designationUrl:string='https://localhost:44317/api/TblDesignations';
   employeeUrl:string='https://localhost:44317/api/TblEmployees';
   listEmployee:Employee[]=[];//FOr fetting data employee list
   listDesignation:Designation[]=[];

   employeedata:Employee =new Employee();//for post data and insert data

   SaveEmployee()
   {
     console.log("Data posted",this.employeedata)
    return this.myhttp.post(this.employeeUrl,this.employeedata);
   }

   UpdateEmployee()
   {
    return this.myhttp.put(`${this.employeeUrl}/${this.employeedata.id}` ,this.employeedata);
   }

   GetEmployee():Observable<Employee[]>
   {
     return this.myhttp.get<Employee[]>(this.employeeUrl);
   }

   GetDesignation():Observable<Designation[]>
   {
     return this.myhttp.get<Designation[]>(this.designationUrl);
   }

   DeleteEmployee(id:number)
   {
     return this.myhttp.delete(`${this.employeeUrl}/${id}`)
   }
}
