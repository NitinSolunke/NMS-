export class usersClass{

             userId :number;
             empCode :string;
             firstName :string;
             lastName:string;
             dateOfBirth:Date;
             gender:string;
             empPassword:string;
             email:string;
             mobileNumber:string;
             dapartment:string;
             designation:string;
             address:string;
             maritalStatus:string;
             pancardNumber:string;
             adharcardNumber:string 
}

export interface MyUserResult{
    success:boolean;
    data:usersClass[];
}