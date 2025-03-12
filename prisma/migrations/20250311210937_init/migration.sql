-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" BYTEA NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);
