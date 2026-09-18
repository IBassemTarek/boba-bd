import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App.jsx'

describe('birthday experience', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('opens the gift and reveals the birthday page', async () => {
    vi.useFakeTimers()
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'افتحي الهدية يا بوبا' }))
    await act(() => vi.advanceTimersByTimeAsync(750))
    expect(screen.getByRole('heading', { name: /كل سنة وإنتِ/ })).toBeInTheDocument()
  })

  it('opens and closes a photo dialog', async () => {
    vi.useFakeTimers()
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'افتحي الهدية يا بوبا' }))
    await act(() => vi.advanceTimersByTimeAsync(750))
    fireEvent.click(screen.getByRole('button', { name: /تكبير: ضحكة/ }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('reveals the final wish after extinguishing the candles', async () => {
    vi.useFakeTimers()
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'افتحي الهدية يا بوبا' }))
    await act(() => vi.advanceTimersByTimeAsync(750))
    fireEvent.click(screen.getByRole('button', { name: 'اطفئي شموع عيد الميلاد' }))
    expect(screen.getByRole('status')).toHaveTextContent('كل سنة وإنتِ مبسوطة')
  })
})
