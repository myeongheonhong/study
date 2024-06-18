import { Document } from 'mongodb';
import mongoose from 'mongoose';

export interface PortfolioSchemaTypes extends Document {
  user_id: string;
  portfolio_title: string;
  portfolio_image_url: string;
}

const portfolioSchema = new mongoose.Schema<PortfolioSchemaTypes>({
  user_id: { type: String },
  portfolio_title: { type: String },
  portfolio_image_url: { type: String },
});

const PortfolioModel = mongoose.model('Portfolio', portfolioSchema);

export default PortfolioModel;
