export class CreateImageDto {
  readonly url: string;
  readonly coordinates: {
    lat: number;
    lng: number;
  };
}
