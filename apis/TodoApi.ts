import User from '../models/User';
import { APIRequestContext } from '@playwright/test';

export default class TodoApi {
    async addTodo(request: APIRequestContext, user: User) {
        try {
            const accessToken = user.getAccessToken();
            console.log('Access Token:', accessToken); // Log the access token for debugging

            const response = await request.post('/api/v1/tasks', {
                data: {
                    isCompleted: false,
                    item: 'Learn Playwright',
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok()) {
                const responseBody = await response.json();
                console.error('Response Body:', responseBody); // Log the response body for debugging
                throw new Error(`Request failed with status ${response.status()}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error adding todo:', error);
            throw error;
        }
    }
}