import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import AddCategory from "../../app/components/client/AddCategory";
import {it, expect, test} from '@jest/globals';

test('renders AddCategory', async () => {
    render(<AddCategory />);
})