
import request from 'superagent';

export default function exists({ org, team, email }, fn){
  let data = { email, team };

  request
  .post(`https://${org}.slack.com/api/auth.findUser`)
  .type('form')
  .send(data)
  .end(function(err, res){
    if (err) return fn(err);
    if (200 != res.status) {
      fn(new Error(`Invalid response ${res.status}.`));
      return;
    }
    console.log('auth.findUser response', res.body);
    var exists = res.body && res.body.ok;
    fn(null, exists);
  });
}
