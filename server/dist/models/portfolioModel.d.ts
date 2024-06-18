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
import mongoose from 'mongoose';
export interface PortfolioSchemaTypes extends Document {
    user_id: string;
    portfolio_title: string;
    portfolio_image_url: string;
}
declare const PortfolioModel: mongoose.Model<PortfolioSchemaTypes, {}, {}, {}, mongoose.Document<unknown, {}, PortfolioSchemaTypes> & PortfolioSchemaTypes & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<PortfolioSchemaTypes, mongoose.Model<PortfolioSchemaTypes, any, any, any, mongoose.Document<unknown, any, PortfolioSchemaTypes> & PortfolioSchemaTypes & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, PortfolioSchemaTypes, mongoose.Document<unknown, {}, mongoose.FlatRecord<PortfolioSchemaTypes>> & mongoose.FlatRecord<PortfolioSchemaTypes> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default PortfolioModel;
//# sourceMappingURL=portfolioModel.d.ts.map