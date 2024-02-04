import { Injectable } from '@nestjs/common';

@Injectable()
export class MockLibraryService {
  private userCredentials: Map<string, { username: string; password: string }>;

  constructor() {
    this.userCredentials = new Map();
    this.initializeMockLibrary();
  }

  private initializeMockLibrary(): void {
    // Add mock user credentials to the library
    this.userCredentials.set('readuser', {
      username: 'readuser',
      password: 'sa',
    });
    this.userCredentials.set('writeuser', {
      username: 'writeuser',
      password: 'sa',
    });
    // Add more users as needed
  }

  getUserCredentials(
    permission: string,
  ): { username: string; password } | undefined {
    return this.userCredentials.get(permission);
  }

  displayMockLibraryContent(): void {
    console.log('Contents of the Mock Library:');
    this.userCredentials.forEach((value, key) => {
      console.log(
        `Permission: ${key}, Username: ${value.username}, Password: ${value.password}`,
      );
    });
  }
}
