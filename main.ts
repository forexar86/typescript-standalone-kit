import * as storage from './Storage';
import * as stackoverflow from './StackoverflowAPI';


let user = new stackoverflow.StackoverflowUser(157882);
let api = new stackoverflow.StackoverflowAPI(user);

let store = new storage.MysqlStorage();

api.getUserPosts()
  .then(function(json) {
//    console.log(body);
    let promises: Promise<any>[] = [];
    json.items.forEach(function(item) {
      promises.push( store.storePost(item.post_id, item.post_type, item.body) );
    });
    return Promise.all(promises);
  })
  .then(function() {
    process.exit(1);
  })
  .catch(function(err) {
    console.log(err);
  });


