import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      gym_id: 'GYM-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'GYM-02',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'GYM-03',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(3)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'GYM-01' }),
      expect.objectContaining({ gym_id: 'GYM-02' }),
      expect.objectContaining({ gym_id: 'GYM-03' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    const MAX = 22

    for (let i = 1; i <= MAX; i++) {
      await checkInsRepository.create({
        gym_id: `GYM-${i}`,
        user_id: 'user-01',
      })
    }
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'GYM-21' }),
      expect.objectContaining({ gym_id: 'GYM-22' }),
    ])
  })
})
