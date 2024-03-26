import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  title: string;
  @Prop({
    trim: true, // Remove white spaces
  })
  description: string;
  @Prop({
    default: false,
  })
  done: boolean;

  @Prop({
    enum: ['low', 'medium', 'high'],
    default: 'low',
    required: true,
  })
  priority: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
