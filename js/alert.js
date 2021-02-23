let user = {}

alert ( isEmpty(user) );
alert (user.name);

user.name = "John";

alert ( isEmpty(user) );
alert (user.name);

function isEmpty (obj){
  return Object.keys(obj).length;
}
