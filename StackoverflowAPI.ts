import * as rp from 'request-promise';

export class StackoverflowUser {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

export class StackoverflowAPI {
  user: StackoverflowUser;

  constructor(user: StackoverflowUser) {
    this.user = user;
  }

  /**
   * Get user's questions and answers
   **/
  getUserPosts() {
    var url = 'https://api.stackexchange.com/2.2'
            + '/users/'+this.user.id
            + '/posts?order=desc&sort=activity&site=stackoverflow'
            + '&pagesize=100&filter=withbody'
            ;
    var cfg = {
      method: 'GET',
      url: url,
      gzip: true,
      json: true
    };
    return rp.get(cfg);
  }

}