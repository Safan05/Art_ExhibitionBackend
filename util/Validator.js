const Ajv=require("ajv");
const ajv=new Ajv();
const schema={
    type:"object",
    properties:{
        name:{type:"string"},
        email:{type:"string",
              pattern: "^\\S+@\\S+\\.\\S+$",
            //  format: "email"
            },
        password:{type:"string",minLength:5}
    },
    required:["name","email","password"]
}
module.exports=ajv.compile(schema);