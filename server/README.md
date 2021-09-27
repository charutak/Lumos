# Lumos Server

## Features
- CRUD into database for Animation Name <-> User Group pair
- Server is only to add to MQTT Broker and persist configs and metadata
- Topic management for mqtt broker


## Design
### Topics
- /lumos/user-group-id/animation/device-id -> [(RGG)]  
  - clients send response with last color with animation ID 0 when animation over  
- /lumos/user-group-id/config/device-id > sync/syncoff + on/off  
- /lumos/user-group-if/current -> on/off  

### Terms
- Animation is a array of numbers where consecutive numbers are consecutive colors with constant time gap  

### Server
- Ensure DB Config is in Sync with MQTT Topics  
- Interaction with App  
- Authentication and Authorisation  
