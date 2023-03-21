import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the header text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Kanban Simulation/i);
  expect(linkElement).toBeInTheDocument();
});
