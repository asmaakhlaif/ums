import Sequelize from 'sequelize';

export const sequelize = new Sequelize('ums', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

export const connectDB =()=>{
    sequelize.sync()
    .then(()=>{
        console.log("connection established");
    })
    .catch((error)=>{
        console.log("error to connect to database" + error);
    })
}