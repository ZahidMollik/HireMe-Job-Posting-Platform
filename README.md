# HireMe- Job Posting Platform

HireMe is a job posting platform that allows different types of users (Admin, JobSeeker, and Employee) to register and interact with the system.

## Project Setup

- clone this repository

  ```
  https://github.com/ZahidMollik/HireMe-Job-Posting-Platform.git

  ```

- Go inside the folder path and execute the following command:

  ```
    npm install

  ```

- In the root directory create a `.env` file and add the following variable

  ```
    PORT=<Port number of you choice>
    MONGODB_URL=<Your MongoDB URL>
    JWT_SECRET=<Your secret for jwt>
    STORE_ID=<Your sslcommerz Store id>
    STORE_PASSWORD=<Your sslcommerz Store password>
    ADMIN_SECRET=<Your admin secret that use to register Admin>
    SERVER_URL= <Your server URL where your server running>

  ```

- then execute the following command:

  ```
    npm run build

  ```

- After executing the above command
then execute the following command to run the project:
  ```
    npm run start
  ```
- if you want to run typescript without compiling JS then execute the following command:

  ```
    npm run dev
  ```


  ## API Reference

  ### Base URL

  ```
   http://localhost:<Port Number>/api/
  ```

  ### Endpoints

  ### AUTH

  `POST /register`

   Description: create a new user as jobseeker.

   Request Body example:
  ```javascript
    {
        "name":"Afnan",
        "email":"afnan@gmail.com",
        "password":"123456"
    }
  ```
   Response Body example:
  ```javascript
    {
        "success": true,
        "message": "User register successfully",
        "data": {
            "name": "Afnan",
            "email": "afnan@gmail.com",
            "password": "$2b$10$69ByWlyJrSwP4mYDjkuXAeUOZV6oJieONa2E7bPL7OmD6xH/zLiOO",
            "role": "jobseeker",
            "companyId": null,
            "_id": "682728195cee37a55ac77f1a",
            "__v": 0
        }
    }
  ```
  `POST /register`

   Description: create a new user as admin. For admin register here it need an adminSecret.Only if the person know this  secrect than that person able to register as admin and also role need to define admin

   Request Body example:
  ```javascript
    {
        "name":"Zahid",
        "email":"zahid@gmail.com",
        "password":"123456",
        "role":"admin",
        "adminSecret":"HireMe@65#"
    }
  ```
   Response Body example:
  ```javascript
    {
        "success": true,
        "message": "User register successfully",
        "data": {
            "name": "Zahid",
            "email": "zahid@gmail.com",
            "password": "$2b$10$HhRO/V0JLcYfjm9ad7QJl.sHM1WC4o3tqutTGXSw6ak5D6Vj/5j9S",
            "role": "admin",
            "companyId": null,
            "_id": "682706fd65bd9c16f712cb27",
            "__v": 0
        }
    }
  ```
  `POST /register`

   Description: create a new user as empolyee.For employee register we need to pass role as employee and a companyId

   Request Body example:
  ```javascript
   {
    "name":"Faisal",
    "email":"faisal@gmail.com",
    "password":"123456",
    "role":"employee",
    "companyId":"68272a035cee37a55ac77f1e"
    }
  ```
   Response Body example:
  ```javascript
    {
        "success": true,
        "message": "User register successfully",
        "data": {
            "name": "Faisal",
            "email": "faisal@gmail.com",
            "password": "$2b$10$G6.NKppKkwr7w5AzD3n70edMnmPm79MAuh2u1.bYQjxIDL5v1YDVO",
            "role": "employee",
            "companyId": "68272a035cee37a55ac77f1e",
            "_id": "68272b912b0dcfb9c8a75928",
            "__v": 0
        }
    }
  ```

  `POST /login`

   Description: login the system.

   Request Body example:
  ```javascript
    {
        "email":"zahid@gmail.com",
        "password":"123456"
    }
  ```
   Response Body example:
  ```javascript
    {
        "success": true,
        "message": "User login successfully",
        "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI3MDZmZDY1YmQ5YzE2ZjcxMmNiMjciLCJlbWFpbCI6InphaGlkQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NzM5NDI2MiwiZXhwIjoxNzQ3OTk5MDYyfQ.3tfQGdljy_3vQtCiBf_7JqbMx-DAT2Q9NOSPpaO8kkY"
    }
  ```

  ### JOBSEEKER

  `POST /jobseeker/apply/:jobId`

  Description: Description: Apply to a job with a CV file but we need to pay 100 TK to apply successfull otherwise apply will fail

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
    Content-Type: multipart/form-data
  ```

  **Params:**
  - `jobId` – Job ID you want to apply for.

  **Request Body (form-data):**
  ```
    cv: <PDF File or DOCX File>
  ```
  **Response Body example:**
    ```json
    {
      "success": true,
      "url": "https://sandbox.sslcommerz.com/EasyCheckOut/testcded1c48ed0d2293e6f826c6c84d353fe6a"
    }
  ```    

  `GET /jobseeker/jobs`

  Description: Fetch all available job listings.  

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Response Body example:**
    ```json
    {
      "success": true,
      "message": "successfully get all jobs",
      "data": [
        {
          "_id": "68279111dd55c22b4cfdd0f3",
          "title": "Backend Developer",
          "description": "If you're passionate about building robust and scalable Backend systems, writing clean code, and collaborating with cross-functional teams to solve real-world problems, we’d love to hear from you.",
          "location": "banasree,dhaka",
          "salary": 40000,
          "lastDateOfApply": "2025-05-26T00:00:00.000Z",
          "createdBy": "682775723e1afc5ed239e19d",
          "companyId": "68272a035cee37a55ac77f1e",
          "createdAt": "2025-05-16T19:22:18.245Z",
          "__v": 0
        }
      ]
    }
  ```
  `GET /jobseeker/application`

  Description: Fetch all job applications submitted by the authenticated jobseeker.  

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Response Body example:**
    ```json
    {
      "success": true,
      "message": "successfully get all Application by user",
      "data": [
        {
          "_id": "68282f268b97fd0db6b8270d",
          "jobId": "68279111dd55c22b4cfdd0f3",
          "applicantId": "6826ff4a87464551e3f61c9d",
          "cvPath": "/uploads/cv/cv-1747460193161-zahid_resume (2).pdf",
          "status": "pending",
          "paymentStatus": "success",
          "__v": 0
        }
      ]
    }
  ```




  
  ### ADMIN

  ### Company

  `POST /api/admin/companies`

  Description: Creates a new company.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```


  **Request Body:**
  ```json
    {
      "name":"LevelUp ads Agency",
      "location":"banasree,dhaka"
    }
  ```
  **Response Body example:**
    ```json
    {
      "success": true,
      "message": "company add successfully",
      "data": {
        "name": "LevelUp ads Agency",
        "location": "banasree,dhaka",
        "_id": "682873f33deec775c558083f",
        "__v": 0
    }
  }
  ```    

  `GET /api/admin/companies`

  Description: Retrieves all companies.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Response Body example:**
    ```json
    {
      "success": true,
      "message": "successfully get all companies",
      "data": [
        {
          "_id": "...",
          "name": "bdCallingIT",
          "location": "banasree,dhaka"
        },
        ...
      ]
    }
  ```
  `GET /api/admin/companies/:id`

  Description:Gets a single company by its ID.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Response Body example:**
    
  ```json
    {
      "success": true,
      "message": "successfully get a company by id",
      "data": [
        {
          "_id": "...",
          "name": "bdCallingIT",
          "location": "banasree,dhaka"
        }
      ]
    }
  ```
  `PUT /api/admin/companies/:id`

  Description:Updates the company’s details.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Request Body:**
  ```json
    {
      "location":"Banasree,Dhaka,Bangladesh"
    }
  ```
  **Response Body example:**
    
  ```json
    {
      "success": true,
      "message": "successfully update company details",
      "data": {
        "_id": "68272a035cee37a55ac77f1e",
        "name": "bdCallingIT",
        "location": "Banasree,Dhaka,Bangladesh"
      }
    }

  ```
  `DELETE /api/admin/companies/:id`

  Description:Deletes a company.
  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Response Body example:**
    
  ```json
  {
    "success": true,
    "message": "successfully delete the company",
    "data": {
      "acknowledged": true,
      "deletedCount": 1
    }
  }
  ```

  ### User Mangement for admin

  `GET /api/admin/users`

  Description: get all users info.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Response Body example:**
    ```json
    {
      "success": true,
      "message": "successfully get all users info",
      "data": [
        {
          "_id": "...",
          "name": "Mollik",
          "email": "mollik@gmail.com",
          "role": "jobseeker",
          "companyId": null
        },
        ...
      ]
    }

  ```    

  `PUT /api/admin/users/:id`

  Description: update user info.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```

  **Request:**
  ```json
  {
    "name": "Pias Ahmed"
  }


  ```
  **Response Body example:**
    ```json
      {
        "success": true,
        "message": "successfully update user details",
        "data": {
          "_id": "...",
          "name": "Pias Ahmed"
        }
      }

  ```
  
  `DELETE /api/admin/users/:id`

  Description:delete a single user by its ID.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Response Body example:**
    
  ```json
    {
      "success": true,
      "message": "successfully delete the user",
      "data": {
        "acknowledged": true,
        "deletedCount": 1
      }
    }
  ```
  ### Job Mangement for admin

  `GET /api/admin/jobs`

  Description: get all jobs.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Response Body example:**
    ```json
      {
        "success": true,
        "message": "successfully get all jobs",
        "data": [
          {
            "_id": "...",
            "title": "Backend Developer",
            "location": "banasree,dhaka",
            "salary": 40000
          },
          ...
        ]
      }
  ```    

  `GET /api/admin/jobs?company=CompanyName`

  Description: get all Jobs filtered by company name.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  
  **Response Body example:**
   same as Get All Jobs

  `PUT /api/admin/jobs/:id`

  Description: update job info by its id.
  
  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```

  **Request:**
  ```json
    {
        "salary":50000
    }


  ```
  **Response Body example:**
    ```json
        {
            "success": true,
            "message": "successfully update the job details by admin",
            "data": {
                "_id": "68287c163deec775c558084f",
                "title": "Frontend Developer",
                "description": "If you're passionate about building robust and scalable Frontend systems, writing clean code, and collaborating with cross-functional teams to solve real-world problems, we’d love to hear from you.",
                "location": "banasree,dhaka",
                "salary": 50000,
                "lastDateOfApply": "2025-05-26T00:00:00.000Z",
                "createdBy": "682775723e1afc5ed239e19d",
                "companyId": "68272a035cee37a55ac77f1e",
                "createdAt": "2025-05-17T11:30:59.052Z",
                "__v": 0
            }
        }

  ```
  
  `DELETE /api/admin/jobs/:id`

  Description: delete a single job by its id.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Response Body example:**
    
  ```json
    {
      "success": true,
      "message": "successfully delete the job by admin",
      "data": {
        "acknowledged": true,
        "deletedCount": 1
      }
    }

  ```

  #### Application Management by Admin

  `GET /api/admin/application`

    Description: Get All Applications

  **Header:**
  ```javascript
    Authorization: Bearer <token>
  ```

  **Response Body example:**
    
  ```json
    {
      "success": true,
      "data": [
        {
          "_id": "...",
          "jobId": "...",
          "applicantId": "...",
          "cvPath": "uploads/cv/filename.pdf",
          "status": "accept",
          "paymentStatus": "success"
        },
        ...
      ]
    }


  ```
  `GET /api/admin/analytics`

    Description: Get analytics about system

  **Header:**
  ```javascript
    Authorization: Bearer <token>
  ```

  **Response Body example:**
    
  ```json
    {
        "success": true,
        "analytics": {
            "totalCompanies": 1,
            "totalJobs": 1,
            "totalApplications": 2,
            "totalJobSeekers": 1
        }
    }
  ```

### EMPLOYEE

  ### Job Mangement by employee

  `POST /api/employee/jobs`

  Description: Creates a new job.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```


  **Request Body:**
  ```json
    {
    "title":"Frontend Developer",
    "description":"If you're passionate about building robust and scalable Frontend systems, writing clean code, and collaborating with cross-functional teams to solve real-world problems, we’d love to hear from you.",
    "location":"banasree,dhaka",
    "lastDateOfApply":"2025-05-26T00:00:00.000Z",
    "salary":40000

    }
  ```
  **Response Body example:**
  ```json
      {
      "success": true,
      "message": "company add successfully",
      "data": {
        "name": "LevelUp ads Agency",
        "location": "banasree,dhaka",
        "_id": "682873f33deec775c558083f",
        "__v": 0
       }
      }
  ```    

  `GET /api/employee/jobs`

  Description: Retrieves all jobs created by login employee.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Response Body example:**

  ```json
    {
    "success": true,
    "message": "successfully get all jobs",
    "data": [
     {
        "_id": "682775823e1afc5ed239e1a0",
        "title": "Backend Developer",
        "description": "If you're passionate about building robust and scalable backend systems, writing clean code, and collaborating with cross-functional teams to solve real-world problems, we’d love to hear from you.",
        "location": "banasree,dhaka",
        "salary": 30000,
        "lastDateOfApply": "2025-05-25T00:00:00.000Z",
        "createdBy": "68272b912b0dcfb9c8a75928",
        "companyId": "68272a035cee37a55ac77f1e",
        "createdAt": "2025-05-16T17:20:51.478Z",
        "__v": 0
      },
    ...
   ]
  }
  ```

  `GET /api/employee/jobs/:id`

  Description:Gets a single job by its ID from all jobs login employee created.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Response Body example:**
    
  ```json
    {
      "success": true,
      "message": "successfully get the job",
      "data": {
        "_id": "...",
        "title": "Backend Developer",
        ...
      }
    }

  ```
  `PUT /api/employee/jobs/:id`

  Description:Update the Job’s details.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
   **Request Body:**
  ```json
    {
      "salary": 35000
    }
  ```
  **Response Body example:**
    
  ```json
    {
      "success": true,
      "message": "successfully update the job details",
      "data": {
        "_id": "682775823e1afc5ed239e1a0",
        "title": "Backend Developer",
        "description": "If you're passionate about building robust and scalable backend systems, writing clean code, and collaborating with cross-functional teams to solve real-world problems, we’d love to hear from you.",
        "location": "banasree,dhaka",
        "salary": 35000,
        "lastDateOfApply": "2025-05-25T00:00:00.000Z",
        "createdBy": "68272b912b0dcfb9c8a75928",
        "companyId": "68272a035cee37a55ac77f1e",
        "createdAt": "2025-05-16T17:20:51.478Z",
        "__v": 0
    }
}

  ```
  `DELETE /api/employee/jobs/:id`

  Description:Delete a job by Id.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Response Body example:**
    
  ```json
  {
    "success": true,
    "message": "successfully delete the job",
    "data": {
      "acknowledged": true,
      "deletedCount": 1
    }
  }
  ```

### Application Management by employee

  `GET /api/employee/application`

  Description:get all Applications by employee.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Response Body example:**
    
  ```json
  {
    "success": true,
    "message": "successfully get all Application by employee",
    "data": [...]
  }
  ```

  `PUT /api/employee/application/status/:id`

  Description:update application status by id.

  **Headers:**
  ```javascript
    Authorization: Bearer <token>
  ```
  **Resquest:**
  ```json
    {
      "status": "accept"
    }

  ```
  **Response Body example:**
    
  ```json
      {
        "success": true,
        "message": "Application status updated successfully",
        "data": {
          "_id": "68282f268b97fd0db6b8270d",
          "jobId": "68279111dd55c22b4cfdd0f3",
          "applicantId": "6826ff4a87464551e3f61c9d",
          "cvPath": "/uploads/cv/cv-1747460193161-zahid_resume (2).pdf",
          "status": "accept",
          "paymentStatus": "success",
          "__v": 0
      }
    }
  ```




