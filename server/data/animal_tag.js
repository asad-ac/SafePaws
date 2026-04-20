const animalTagData = [
    // Leo (lion)
    { animal_id: 1, tag_id: 1 }, // Vaccinated
    { animal_id: 1, tag_id: 2 }, // Healthy
  
    // Maya (elephant - injured)
    { animal_id: 2, tag_id: 4 }, // Special Needs
    { animal_id: 2, tag_id: 5 }, // Needs Medication
  
    // Zara (zebra - recovered)
    { animal_id: 3, tag_id: 2 }, // Healthy
    { animal_id: 3, tag_id: 7 }, // Special Diet
  
    // Kiko (monkey - new)
    { animal_id: 4, tag_id: 6 }, // New Arrival
    { animal_id: 4, tag_id: 3 }, // Requires Training
  
    // Rex (wolf - aggressive)
    { animal_id: 5, tag_id: 8 }, // Territorial
    { animal_id: 5, tag_id: 3 }, // Requires Training
  
    // Luna (deer - special case)
    { animal_id: 6, tag_id: 4 }, // Special Needs
    { animal_id: 6, tag_id: 2 }  // Healthy
  ];
  
  export default animalTagData;