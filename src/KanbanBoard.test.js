import { render, screen } from '@testing-library/react';
import KanbanBoard from './KanbanBoard';

test('renders Kanban board', () => {
    render(<KanbanBoard />);
    const toDoElements = screen.getAllByText('To Do');
    expect(toDoElements.length).toBeGreaterThan(0);
});
