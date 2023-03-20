import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config({});

class Config {
  public NODE_ENV: string | undefined;
  public PORT: string | undefined;
  public CLIENT: string | undefined;
  public HOST: string | undefined;
  public USER: string | undefined;
  public PASSWORD: string | undefined;
  public DATABASE: string | undefined;
  public CLIENT_URL: string | undefined;
  public BASE_PATH: string | undefined;
  public CLOUDINARY_NAME: string | undefined;
  public CLOUDINARY_API_KEY: string | undefined;
  public CLOUDINARY_API_SECRET: string | undefined;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || undefined;
    this.PORT = process.env.PORT || undefined;
    this.CLIENT = process.env.CLIENT || undefined;
    this.HOST = process.env.HOST || undefined;
    this.USER = process.env.USER || undefined;
    this.PASSWORD = process.env.PASSWORD || undefined;
    this.DATABASE = process.env.DATABASE || undefined;
    this.CLIENT_URL = process.env.CLIENT_URL || undefined;
    this.BASE_PATH = process.env.BASE_PATH || undefined;
    this.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || undefined;
    this.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || undefined;
    this.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || undefined;
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined`);
      }
    }
  }

  public cloudinaryConfig(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUDINARY_NAME,
      api_key: this.CLOUDINARY_API_KEY,
      api_secret: this.CLOUDINARY_API_SECRET
    });
  }
}

export const config = new Config();
