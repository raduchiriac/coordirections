AccountsTemplates.removeField('email');
var pwd = AccountsTemplates.removeField('password');

AccountsTemplates.addFields([{
  _id: "username",
  type: "text",
  displayName: "username",
  required: true,
  minLength: 3,
}, {
  _id: 'email',
  type: 'email',
  required: true,
  displayName: "email",
  re: /.+@(.+){2,}\.(.+){2,}/,
  errStr: 'Invalid email',
}, {
  _id: 'username_and_email',
  type: 'text',
  required: true,
  displayName: "Username or Email",
  placeholder: "Username or Email"
}]);

// Add back password field
AccountsTemplates.addField(pwd);

AccountsTemplates.configure({
  forbidClientAccountCreation: false,
  texts: {
    title: {
      signIn: "Login",
    },
    button: {
      signIn: "Login",
    }
  },
  negativeValidation: false,
  negativeFeedback: false,
  positiveValidation: false,
  positiveFeedback: false,
  showValidating: true,
});
