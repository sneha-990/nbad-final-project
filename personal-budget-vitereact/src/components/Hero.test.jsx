// Hero.test.jsx
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero component', () => {
  it('renders heading and subheading', () => {
    render(<Hero />);
    const headingElement = screen.getByText(/Personal Budget/i);
    const subheadingElement = screen.getByText(/A personal-budget management application/i);

    expect(headingElement).toBeInTheDocument();
    expect(subheadingElement).toBeInTheDocument();
  });
});
