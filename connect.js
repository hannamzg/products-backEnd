import mysql from "mysql";

export const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"product project"
});