const animalTagData = [
  // Leo (lion)
  { animal_id: 1, tag_id: 1 },
  { animal_id: 1, tag_id: 2 },

  // Maya (elephant - injured)
  { animal_id: 2, tag_id: 4 },
  { animal_id: 2, tag_id: 5 },

  // Zara (zebra - recovered)
  { animal_id: 3, tag_id: 2 },
  { animal_id: 3, tag_id: 7 },

  // Kiko (monkey - new)
  { animal_id: 4, tag_id: 6 },
  { animal_id: 4, tag_id: 3 },

  // Rex (wolf - aggressive)
  { animal_id: 5, tag_id: 8 },
  { animal_id: 5, tag_id: 3 },

  // Luna (deer - special case)
  { animal_id: 6, tag_id: 4 },
  { animal_id: 6, tag_id: 2 },

  // Simba (young lion)
  { animal_id: 7, tag_id: 6 }, // New Arrival
  { animal_id: 7, tag_id: 3 }, // Requires Training

  // Bruno (bear)
  { animal_id: 8, tag_id: 4 }, // Special Needs
  { animal_id: 8, tag_id: 5 }, // Needs Medication

  // Tango (parrot)
  { animal_id: 9, tag_id: 3 }, // Requires Training
  { animal_id: 9, tag_id: 6 }, // New Arrival

  // Atlas (elephant - healthy)
  { animal_id: 10, tag_id: 1 }, // Vaccinated
  { animal_id: 10, tag_id: 2 }, // Healthy

  // Ivy (monkey)
  { animal_id: 11, tag_id: 3 }, // Requires Training
  { animal_id: 11, tag_id: 7 }, // Special Diet

  // Shadow (leopard)
  { animal_id: 12, tag_id: 8 }, // Territorial
  { animal_id: 12, tag_id: 2 }, // Healthy

  // Dash (zebra)
  { animal_id: 13, tag_id: 2 }, // Healthy
  { animal_id: 13, tag_id: 7 }, // Special Diet

  // Aurora (wolf - trained)
  { animal_id: 14, tag_id: 3 }, // Requires Training
  { animal_id: 14, tag_id: 2 }, // Healthy

  // Coco (parrot)
  { animal_id: 15, tag_id: 2 }, // Healthy
  { animal_id: 15, tag_id: 6 }, // New Arrival

  // Rocky (bear)
  { animal_id: 16, tag_id: 4 }, // Special Needs
  { animal_id: 16, tag_id: 7 }, // Special Diet

  // Loki (fox)
  { animal_id: 17, tag_id: 6 }, // New Arrival
  { animal_id: 17, tag_id: 3 }, // Requires Training

  // Nora (giraffe)
  { animal_id: 18, tag_id: 2 }, // Healthy
  { animal_id: 18, tag_id: 1 }, // Vaccinated

  // Max (tiger)
  { animal_id: 19, tag_id: 3 }, // Requires Training
  { animal_id: 19, tag_id: 8 }, // Territorial

  // Bella (deer)
  { animal_id: 20, tag_id: 2 }, // Healthy
  { animal_id: 20, tag_id: 1 }  // Vaccinated
];

export default animalTagData;