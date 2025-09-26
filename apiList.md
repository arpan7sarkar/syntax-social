# syntax-social APIs

### Auth Router
POST /SIGNUP
POST/LOGIN
POST /LOGOUT

### Profile Router
GET /PROFILE
PATCH /PROFILE/edit
PATCH /profile/password

### Connection request router
POST /request/send/intrested or ignored /:userId
POST /request/review/accept or reject/:requestId
post  /ignore // /accept // block // intrested // 


GET /SETTING
PATCH /SETTING
POST /sendConnectionRequest



### User Router
GET /user/request/recived
GET /connection
GET /feed - it gets you other users 10+

status:values:["ignore", "interested", "accepeted", "rejected"],