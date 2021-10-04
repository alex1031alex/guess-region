import React from 'react';
import {render, screen} from '@testing-library/react';
import Header from './header';

describe("Header", () => {
  it("renders Header component", () => {
    render(<Header />);
    expect(screen.getByText('Как хорошо Вы знаете Смоленскую область?'))
      .toBeInTheDocument();
  });
});
