import { Document } from 'mongodb';
import mongoose, { ObjectId } from 'mongoose';

// const bcrypt = require('bcrypt');

type RegistrationTypes = 'local' | 'kakao' | 'google';

export interface UserSchemaTypes extends Document {
  id: string;
  email: string;
  password: string;
  username: string;
  registrationType: RegistrationTypes;
  refreshToken: string;
  portfolio_id_list: ObjectId[];
}

const userSchema = new mongoose.Schema<UserSchemaTypes>({
  id: { type: String, unique: true },
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String, minLength: 8 },
  registrationType: { type: String },
  refreshToken: { type: String },
  portfolio_id_list: { type: [String] },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
