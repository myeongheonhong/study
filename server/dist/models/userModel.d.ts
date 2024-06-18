/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongodb';
import mongoose, { ObjectId } from 'mongoose';
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
declare const UserModel: mongoose.Model<UserSchemaTypes, {}, {}, {}, mongoose.Document<unknown, {}, UserSchemaTypes> & UserSchemaTypes & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<UserSchemaTypes, mongoose.Model<UserSchemaTypes, any, any, any, mongoose.Document<unknown, any, UserSchemaTypes> & UserSchemaTypes & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserSchemaTypes, mongoose.Document<unknown, {}, mongoose.FlatRecord<UserSchemaTypes>> & mongoose.FlatRecord<UserSchemaTypes> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default UserModel;
//# sourceMappingURL=userModel.d.ts.map