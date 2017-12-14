import * as mysql from 'promise-mysql';

interface Storage {
  storePost(id:number, type:string, text:string);
}

export class MysqlStorage implements Storage {
  pool:any;
  
  constructor() {
    this.pool = mysql.createPool({
      host    : 'localhost',
      user    : 'root',
      password: '',
      database: 'myDB',
      connectionLimit: 10
    });
    
    process.on('SIGINT', function() { process.exit(); });
    process.on('exit', this.shutdown);
  }
  
  private shutdown() {
    console.log('shutting down MysqlStorage');
    if(this.pool) {
      console.log('end mysql pool');
      this.pool.end();
    }
  }
  
  storePost(id:number, type:string, text:string): Promise<any> {
    console.log('storing ' +id);
    let sql = 'INSERT INTO stackoverflow_posts(id,type,body)'
            + ' VALUES(?,?,?)';
    return this.pool.query(sql, [id,type,text])
  }
}
