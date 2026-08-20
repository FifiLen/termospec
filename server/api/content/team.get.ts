import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const members = await queryCollection(event, "team")
    .order("order", "ASC")
    .all();

  return members.map((member) => ({
    name: member.name,
    role: member.role,
    photo: member.photo,
  }));
});
