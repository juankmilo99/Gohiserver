import variables from './configdb';
import {Pool} from 'pg';

const pool= new Pool (variables.database);

pool.connect(function(err, conn){
  if(err){
    console.log('el codigo del error es:',err.stack);
  }else{
    if(conn){
      conn.release();
    }
  }
  console.log('conexiones establecidas con:', variables.database);
});

export default pool;
