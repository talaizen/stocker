import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: "tal@example.com" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @ApiProperty({ example: "securePassword123", minLength: 8, maxLength: 72 })
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @MaxLength(72, { message: "Password must not exceed 72 characters" })
  password: string;

  @ApiProperty({ example: "Tal Aizenkraft" })
  @IsString()
  @MinLength(2, { message: "Name must be at least 2 characters" })
  @MaxLength(100)
  name: string;
}
