import { jwtDecode } from 'jwt-decode';

export class tokenService {
  async getTokenFromRequest(request: any) {
    const authHeader = request.headers['authorization'];

    if (authHeader && typeof authHeader === 'string') {
      const tokenParts = authHeader.split(' ');

      if (tokenParts.length === 2 && tokenParts[0].toLowerCase() === 'bearer') {
        const token = tokenParts[1];

        try {
          const decodedToken = jwtDecode(token); // Replace with your secret
          const permissions = (decodedToken as any)?.authorization?.permissions;
          console.log('Permissions:', permissions);
          // Logging the extracted permissions
          return decodedToken;
        } catch (error) {
          console.error('Token verification error:', error.message);
          // Handle token verification errors or return a default value if needed
          return null;
        }
      }
    }

    return null; // If there's no valid authorization header or token
  }
}
