import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: 'My academy',
      phone: '',
      latitude: -30.030076,
      longitude: -51.1689972,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -30.030076,
      userLongitude: -51.1689972,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // Fluxo de TDD sempre é red, green, refactor
  //  Quando trabalhar com datas preferencialemnte usar o mocking do Vitest

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 6, 26, 21, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -30.030076,
      userLongitude: -51.1689972,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -30.030076,
        userLongitude: -51.1689972,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2023, 6, 26, 21, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -30.030076,
      userLongitude: -51.1689972,
    })

    vi.setSystemTime(new Date(2023, 6, 27, 21, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -30.030076,
      userLongitude: -51.1689972,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: 'My academy',
      phone: '',
      latitude: new Decimal(-30.0193247),
      longitude: new Decimal(-51.1526297),
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -30.030076,
        userLongitude: -51.1689972,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
