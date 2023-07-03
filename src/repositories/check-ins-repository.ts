import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  countByUserId(userId: string): Promise<number>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findByUserInOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
