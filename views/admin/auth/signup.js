//
//
const layout = require('../layout');

const { getError } = require('../../helpers.js');

module.exports = ({ req, errors }) => {
  return layout({
    content: `
      <div>
      Your ID is ${req.session.userId}
        <form method="POST">
          <input name="email" style='display: block' placeholder="email" />
          ${getError(errors, 'email')}        
          <input name="password" style='display: block' placeholder="password" />        
          ${getError(errors, 'password')}        
          <input name="passwordConfirmation" style='display: block' placeholder="password confirmation" />
          ${getError(errors, 'passwordConfirmation')}        
          <button>Sign Up</button>        
        </form>
      </div>
    `
  });
};
