import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import { getColors as mockGetColors } from '../utils/getColors';
jest.mock('../utils/getColors');
const mockColorData = {
  data: [
    {
      code: {hex: '#00ffff'},
      color: 'aqua',
      id: 3,  
    },
    {
      code: {hex: '#9a99dd'},
      color: 'lilac',
      id: 5,  
    },
    {
      code: {hex: '#dd99ba'},
      color: 'softpink',
      id: 5,  
    },
  ]
}

test("Fetches data and renders the bubbles", async () => {
  // Finish this test
  // render BubblePage component
    mockGetColors.mockResolvedValueOnce(mockColorData);
    const {rerender} = render(<BubblePage/>);
    
    await waitFor(() => {
      rerender(<BubblePage/>); 
    });
    screen.debug();
    const colorName = screen.getByText(/aqua/i);
    expect(colorName).toBeInTheDocument(); 
});
