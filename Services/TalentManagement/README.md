# Talent Management Service

Potential Iterations:
		Update User Skills Page -> Search Users Page (Basic Search) -> Search Users Page (Advanced Search)

Potential Data Model:
		tbl_skill (skill_id: int, name: string, description: string)
			- Primary Key: skill_id
			- Look Up table of all skills
			- Example1: (1, "Javascript", "Frontend Web Development Language")
			- Example2: (2, "Management", "Experience with managing people resources")
		tbl_skill_level (skill_level_id: int, name: string, description: string)
			- Primary Key: skill_level_id
			- Look Up table of various skill levels
			- Example: (1, "Junior", "Less than 1 year of experience")
		tbl_user_skill (user_skill_id: int, user_id: int, skill_id: int, skill_level_id: int, notes: string)
			- Primary Key: user_skill_id
			- Foreign Key(s): user_id, skill_id, skill_level_id
			- Relational table between users and their skills
			- User input for "notes"
			- Example: (1, 1, 1, 1, "I consider myself a Junior-level Javascript Developer")

Potential Endpoints:
		- GET /skills
		- GET /skill_levels
		- GET /users/search?skill_ids=[]
		- GET /users/{id}/skills
		- POST /user/{id}/skills/create
		- PUT /user/{id}/skills/update