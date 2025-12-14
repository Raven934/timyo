import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import UserDashboard from '../pages/UserDashboard';

// Mock the api module
vi.mock('../services/api', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
    delete: vi.fn(() => Promise.resolve({ data: {} })),
  },
}));

describe('UserDashboard Component', () => {
  it('renders dashboard header', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <UserDashboard />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/User Dashboard/i)).toBeInTheDocument();
    });
  });
});
