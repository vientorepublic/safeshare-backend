import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'files' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identifier: string;

  @Column({ type: 'varchar' })
  upload_at: number;

  @Column({ type: 'longtext' })
  original_filename: string;

  @Column({ nullable: true, type: 'varchar' })
  maximum_count: number | null;
}
