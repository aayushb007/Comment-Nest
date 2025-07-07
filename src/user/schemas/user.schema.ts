import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document & {
  comparePassword(candidatePassword: string): Promise<boolean>;
};

@Schema()
export class User {
  static comparePassword(password: string) {
    throw new Error('Method not implemented.');
  }
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isVerified: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};
// Hash password before saving
UserSchema.pre('save', async function(next) {
  const user = this;
  
  if (!user.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
