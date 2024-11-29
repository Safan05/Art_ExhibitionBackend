const Ajv=require("ajv");
ajv=new Ajv();
const schema={
    type:"object",
    properties:{
        name:{type:"string",pattern:"^[A-Z][a-z]*$"},
        email:{type:"string",
              pattern: "^\\S+@\\S+\\.\\S+$",
            //  format: "email"
            },
        password:{type:"string",minLength:5}
    },
    required:["name","email","password"]
}
module.exports=ajv.compile(schema);