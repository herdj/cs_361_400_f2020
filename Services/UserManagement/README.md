# User Management Service 

Potential Iterations:
>Create Account Page -> Login/Landing Page -> Update Account Page

Potential Data Model:
>tbl_user (user_id: int, first_name: string, last_name: string, username: string, password: string, created_date: datetime, ..., searchable: bool, active: bool)
- Primary key: user_id
- Contains all the user's personal data
- Password should be hashed
- Can opt in to be searchable by marking themselves as searchable = true
- "Active" flag for to mark users as active or not
- Users are only searchable if they are searchable = true and active = true
- Example: (1, "Larissa", "Lataw", ..., true)

>tbl_duration (duration_id: int, name, description)
- Primary Key: duration_id
- Look Up table for timed durations
- Example: (1, "Less Than One Year", "Associated with an organization for less than one year.")
		
>tbl_user_organization (user_organization_id: int, user_id: int, organization_id: int, duration_id: int)
- Primary Key: user_organization_id
- Foreign Key(s): user_id, organization_id, duration_id
- Relational table between users and the organizations they belong to
- Example: (1, 1, 1, 1)

Potential Endpoints:

		- GET /users 
		- GET /users/{id}
		- GET /users?user_ids=[]
		- POST /users/create
		- PUT /users/update
		- GET /durations
		- GET /organizations/users 
		- GET /organizations/{id}/users
		- POST /users/login
		- PUT /users/{id}/activate
		- PUT /users/{id}/deactivate