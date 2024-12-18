export class LoginResponseDto {
  message: string;
  token: string;
  customer: {
    id: number;
    email: string;
    name: string;
    points: number;
    tier: string | null;
  };
}
