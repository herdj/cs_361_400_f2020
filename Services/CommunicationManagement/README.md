# Communication Management Service

Potential Iterations:
>Messaging Page (Timed/Triggered Refresh) -> Messaging Page (Real-Time Refresh) -> Messaging Page (Upload/Share Media)

Potential Data Model:
>com.tbl_message: (message_id, from_user_id: int, to_user_id: int, message_content: string, timestamp: datetime, deleted: bool)
- Primary Key: message_id
- Table for user-to-user messaging
- Deleted flag to hide messages from the UI
- Foreign Key(s): from_user_id, to_user_id
- Example: (1, 1, 2, "hello friend!", 20200930-22:12:05, false)

Potential Endpoints:

		- GET /users/{id}/messages
		- POST /users/{id}/messages/create
		- DELETE /messages/{id}/delete
		- PUT /messages/{id}/update