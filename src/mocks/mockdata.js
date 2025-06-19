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
 * @typedef {Object} Effect
 * @property {string} id
 * @property {string} name
 * @property {string} [description]
 * @property {string} [color] // Hex color for the chip, e.g., '#FFDF72'
 */

/**
 * @typedef {Object} Character
 * @property {string} id
 * @property {string} name
 * @property {string} [description]
 * @property {[Effect]}  [traits=[]]
 * @property {string} avatarUrl
 */

/** @type {[Character]} */
export const mockCharacters = [
  { id: "char1", name: "Elara", avatarUrl: "https://i.pravatar.cc/150?img=5" },
  { id: "char2", name: "Kael", avatarUrl: "https://i.pravatar.cc/150?img=6" },
  { id: "char3", name: "Lyra", avatarUrl: "https://i.pravatar.cc/150?img=7" },
  { id: "char4", name: "Guard", avatarUrl: "https://i.pravatar.cc/150?img=8" },
  {
    id: "char5",
    name: "Merchant",
    avatarUrl: "https://i.pravatar.cc/150?img=9",
  }, // Will be part of +N
];

export const mockProtagonist = {
  id: "player-char",
  name: "Aella Brightwood",
  description:
    "A young adventurer with a curious spirit and a knack for getting into trouble. Seeks knowledge and perhaps a bit of glory.",
  avatarUrl: "armas.png", // Using a real Unsplash photo URL
  traits: [
    { id: "trait-1", name: "Curious", color: "default" }, // Example using a theme color
    {
      id: "trait-2",
      name: "Quick-Witted",
      color: "success",
    }, // Example using a theme color
    { id: "trait-3", name: "Clumsy", color: "secondary" }, // Example using a theme color
  ],
  // Add other mock data for inventory, relationships, skills if needed later
};
