type SignInParams = {
  user: UserSignInParams;
};

type UserSignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  user: UserSignUpParams;
};

type UserSignUpParams = {
  email: string;
  password: string;
};
