//Capstone 2 | Step 2 | Project Proposal
/*
1. React and Node
2. Evenly focused
3. Website
4. My goal for the project is to create a functional scheduling website
5. Users who want to schedule and view their teams
6. I would just need some fake user data for the DB. Likely an API that provides that data. An API that works similar to the Jobly functionality?

7. Would also be really interesting to use React to re-create the calendar app.
*/

//Outline
/*
1. Database schema
+------------------+       +----------------+       +------------------+
|     Users        |       |     Teams      |       |      Shifts      |
+------------------+       +----------------+       +------------------+
| id (PK)          |◀----▶| id (PK)        |       | id (PK)          |
| username         |       | name           |       | user_id (FK)     |
| email            |       |                |       | team_id (FK)     |
| password_hash    |       |                |       | start_time       |
| team_id (FK)     |       |                |       | end_time         |
+------------------+       +----------------+       +------------------+

Relationships:
- Users belong to one Team (one-to-many)
- Teams have multiple Users (one-to-many)
- Users have multiple Shifts (one-to-many)
- Shifts belong to a User and optionally a Team

2. Potential issues
    a. overlapping shifts | solution would be adding backend validation when creating shifts
    b. handling shift edits | UI and DB must stay in sync, update UI first, then revert if the request fails
    c. authorization | use JWT
    d. displaying linear timeline | can be tricky, check out vis.js/D3.js/React Gantt Chart
3. Sensitive information that needs to be secure?
4. Functionality
    a. User | create/edit/delete | update to manager who has view of the whole team
    b. Team | create/edit/delete
    c. Activities | create/edit/delete in backend | add/remove/update on frontend
    d. Trade? | trade shift with another User
    e. Schedule | move schedules around
5. User flow would be logging in to view and request changes to your schedule (PTO/trade) | managers view/add/schedule their team
6. Trades between users would probably be a stretch goal

NOTE: where to start? start with the DB probably, and then React or Node or API?
*/
