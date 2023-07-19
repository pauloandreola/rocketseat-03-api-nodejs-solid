import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -30.030076,
      longitude: -51.1689972,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -29.0786403,
      longitude: -51.2480764,
    })

    const { gyms } = await sut.execute({
      userLatitude: -30.030076,
      userLongitude: -51.1689972,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })

  // it('should be able to fetch paginated gym search', async () => {
  //   const MAX = 22

  //   for (let i = 1; i <= MAX; i++) {
  //     await gymsRepository.create({
  //       title: `Javascript Gym ${i}`,
  //       description: null,
  //       phone: null,
  //       latitude: -30.030076,
  //       longitude: -51.1689972,
  //     })
  //   }
  //   const { gyms } = await sut.execute({
  //     query: 'Javascript',
  //     page: 2,
  //   })

  //   expect(gyms).toHaveLength(2)
  //   expect(gyms).toEqual([
  //     expect.objectContaining({ title: 'Javascript Gym 21' }),
  //     expect.objectContaining({ title: 'Javascript Gym 22' }),
  //   ])
  // })
})
