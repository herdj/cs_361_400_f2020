# Network Management Service

Potential Iterations:
		User Network Page (Friends Page) -> Organization Page (Basic) -> Organization Page (Advanced) 

Potential Data Model:
		tbl_organization (organization_id, name, description)
			- Primary Key: organization_id
			- Schools, Companies, Non-Profits, you name it
			- Example: (1, "Oregon State University", "Oregon State University based in Corvallis, OR.")
		tbl_organization_resource_type (organization_resource_type_id: int, name: string, description: string, source_key: string)
			- Primary Key: organization_resource_type_id
			- Look Up table for various resources
			- Example: (1, "Logo", "Company's Logo", "/logos")
		tbl_organization_resource (organization_resource_id: int, organization_id: int, organization_resource_type_id: int)
			- Primary Key: organization_resource_id
			- Foreign Key(s): organization_id, organization_resource_type_id
			- Table for user loaded resources
			- Used to dynamically patch together source of resource
			- Example: (1, 1, 1)
		tbl_user_network (user_network_id: int, user_id_1: int, user_id_2: int, created_datetime: datetime)
			- Primary Key: user_network_id
			- Foreign Key(s): user_id_1, user_id_2
			- Relational table for user-to-user friendships
			- Example: (1, 1, 2, 20200930-22:12:05)

Potential Endpoints:
		- GET /organizations
		- GET /organizations/{id}
		- POST /organizations/create
		- PUT /organizations/update
		- GET /organization_resource_types
		- POST /organizations/{id}/organization_resources/create
		- PUT /organizations/{id}/organization_resources/update
		- GET /users/{id}/network