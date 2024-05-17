import mongoose from 'mongoose';

// const bcrypt = require('bcrypt');

type RegistrationTypes = 'local' | 'kakao' | 'google';

export interface UserSchemaTypes {
  id: string;
  email: string;
  password: string;
  username: string;
  registrationType: RegistrationTypes;
  refreshToken: string;
}

const userSchema = new mongoose.Schema<UserSchemaTypes>({
  id: { type: String, unique: true },
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String, minLength: 8 },
  registrationType: { type: String },
  refreshToken: { type: String },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
