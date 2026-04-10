import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "tal@example.com" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @ApiProperty({ example: "securePassword123" })
  @IsString()
  password: string;
}
