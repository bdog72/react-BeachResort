//
//
const layout = require('../layout');

const { getError } = require('../../helpers.js');

module.exports = ({ errors }) => {
  return layout({
    content: `
      <div>
        <form method="POST">
          <input name="email" style='display: block' placeholder="email" />
          ${getError(errors, 'email')}        
          <input name="password" style='display: block' placeholder="password" />        
          ${getError(errors, 'password')}        
          <button>Sign In</button>        
        </form>
      </div>
    `
  });
};
