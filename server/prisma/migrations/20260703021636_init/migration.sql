-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('CREDENTIALS', 'GOOGLE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "provider" "Provider" NOT NULL DEFAULT 'CREDENTIALS',
    "provider_id" TEXT,
    "password_reset_token" TEXT,
    "password_reset_send_at" TIMESTAMP(3),
    "email_verified_at" TIMESTAMP(3),
    "email_verify_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_provider_id_key" ON "User"("provider_id");
