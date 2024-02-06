import '@testing-library/jest-dom'

import {render, screen} from '@testing-library/react'
import Page from "../../app/page";
import {it, expect, test, describe} from '@jest/globals';

describe('renders AddCategory', () => {
    it('renders AddCategory', () => {
        render(<Page />);
    })
})