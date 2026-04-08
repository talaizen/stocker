import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum AuthProvider {
  LOCAL = "local",
  GOOGLE = "google",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "varchar", nullable: true })
  passwordHash: string | null;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: AuthProvider,
    default: AuthProvider.LOCAL,
  })
  authProvider: AuthProvider;

  @Column({ type: "varchar", nullable: true, unique: true })
  googleId: string | null;

  @Column({ type: "varchar", nullable: true })
  refreshTokenHash: string | null;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
