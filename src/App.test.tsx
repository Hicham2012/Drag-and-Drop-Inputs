import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

// Page test
test('Page render', () => {
  render(<App />);
  const linkElement = screen.getByTestId('page');
  expect(linkElement).toBeInTheDocument();
});

// Button test
test('Button render', () => {
  render(<App />);
  const button = screen.getByTestId('save');
  expect(button).toBeInTheDocument();
});

// Table test
test('Table render', () => {
  render(<App />);
  const table = screen.getByTestId('table');
  expect(table).toBeInTheDocument();
});



