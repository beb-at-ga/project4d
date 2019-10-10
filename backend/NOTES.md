



sequelize model:create --name user --attributes "email:string, firstname:string, lastname:string, password:string, agency_id:integer, agent_id:integer, phonenumber:string"


sequelize model:create --name events --attributes "type:string, user:integer, data:string"
