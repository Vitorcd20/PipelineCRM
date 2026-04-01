import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => cleanup())

// Silence act() warnings in tests
vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
