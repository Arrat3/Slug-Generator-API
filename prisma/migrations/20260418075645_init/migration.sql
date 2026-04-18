-- CreateTable
CREATE TABLE "Slug" (
    "id" SERIAL NOT NULL,
    "originalString" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Slug_pkey" PRIMARY KEY ("id")
);


CREATE UNIQUE INDEX "Slug_slug_key" ON "Slug"("slug");
