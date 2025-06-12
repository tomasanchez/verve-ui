// Example Place Structure
/**
 * @typedef {Object} Setting
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} imageUrl
 * @property {[string]} effects
 * @property {Date} timestamp
 */

/**@type {Setting}*/
export const mockPlace = {
  id: "forest-path",
  name: "Forest Path",
  description:
    "A winding path through an ancient forest. Sunlight dapples through the canopy, and the air is thick with the scent of pine and damp earth. Strange rustling sounds occasionally break the quiet.",
  imageUrl:
    "https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/master/pass/BlackForest-Germany-GettyImages-147180370.jpg", // Placeholder image
  effects: ["Calming Aura", "Dense Foliage", "Hidden Dangers"], // Place effects
  timestamp: new Date(), // Current time for display
};

/**
 * @typedef {Object} Character
 * @property {string} id
 * @property {string} name
 * @property {string} avatarUrl
 */

/** @type {[Character]} */
export const mockCharacters = [
  { id: "char1", name: "Elara", avatarUrl: "https://i.pravatar.cc/150?img=5" },
  { id: "char2", name: "Kael", avatarUrl: "https://i.pravatar.cc/150?img=6" },
  { id: "char3", name: "Lyra", avatarUrl: "https://i.pravatar.cc/150?img=7" },
  { id: "char4", name: "Guard", avatarUrl: "https://i.pravatar.cc/150?img=8" }, // Will be part of +N
  {
    id: "char5",
    name: "Merchant",
    avatarUrl: "https://i.pravatar.cc/150?img=9",
  }, // Will be part of +N
];
