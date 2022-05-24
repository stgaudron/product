-- CreateEnum
CREATE TYPE "Kinds" AS ENUM ('city', 'marvel', 'starwars');

-- CreateTable
CREATE TABLE "product" (
    "reference" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "kind" "Kinds" NOT NULL,
    "weight" TEXT,
    "height" TEXT,
    "width" TEXT,
    "length" TEXT,
    "stock" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "product_pkey" PRIMARY KEY ("reference")
);
