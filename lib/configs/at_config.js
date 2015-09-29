AccountsTemplates.configure({
  defaultTemplate: 'register',
  defaultLayout: 'blazeMainLayout',
  defaultLayoutRegions: {},
  defaultContentRegion: 'main',
  showForgotPasswordLink: true,
  enablePasswordChange: true,
  continuousValidation: true,
  negativeValidation: true,
  negativeFeedback: true,
  positiveValidation: false,
  positiveFeedback: false,
  showValidating: true,
});

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([{
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 5,
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
  },
  pwd
]);
