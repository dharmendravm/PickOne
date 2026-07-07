-- AlterTable
ALTER TABLE "Battle" ADD COLUMN     "imagePublicId" TEXT,
ALTER COLUMN "image" DROP NOT NULL;
