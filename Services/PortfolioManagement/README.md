# Portfolio Management Service

Potential Iterations:
		Create User Profile Page -> Update User Profile Page (Advanced Profile) -> User Profile Page (Wall)

Potential Data Model:
		tbl_portfolio (portfolio_id: int, user_id: int, introduction: string)
			- Primary Key: portfolio_id
			- Foreign Key(s): user_id
			- Table for adding data to be displayed on a user's portfolio
			- Example: (1, 1, "Hi! I just graduated college and looking for a job!")
		tbl_portfolio_resource_type (portfolio_resource_type_id: int, name: string, description: string, source_key: string)
			- Primary Key: portfolio_resource_type_id
			- Look Up table for various resources
			- Example: (1, "Profile Picture", "User uploaded Profile Picture", "/profile_pictures")
		tbl_portfolio_resource (portfolio_resource_id: int, portfolio_id: int, portfolio_resource_type_id: int)
			- Primary Key: portfolio_resource_id
			- Foreign Key(s): portfolio_id, portfolio_resource_type_id
			- Table for user loaded resources
			- Used to dynamically patch together source of resource
			- Example: (1, 1, 1)

Potential Endpoints:
		- GET /portfolio_resource_types
		- GET /users/{id}/portfolio
		- POST /users/{id}/portfolio/create
		- PUT /users/{id}/portfolio/update
		- POST /users/{id}/portfolio_resources/create
		- PUT /users/{id}/portfolio_resources/update