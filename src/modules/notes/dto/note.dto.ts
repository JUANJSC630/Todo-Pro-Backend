export class NoteDto {
  id?: number;
  title: string;
  content: string;
  color: string;
  createdAt?: Date;
  isPinned?: boolean;
} 