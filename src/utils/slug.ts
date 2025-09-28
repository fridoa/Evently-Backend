import mongoose from "mongoose";

async function generateUniqueSlug(name: string, model: mongoose.Model<any>): Promise<string> {
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  let slug = baseSlug;
  let counter = 1;

  // Cek apakah slug sudah ada di database
  while (await model.findOne({ slug })) {
    // Jika sudah ada, tambahkan angka di belakangnya dan cek lagi
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export default generateUniqueSlug;
