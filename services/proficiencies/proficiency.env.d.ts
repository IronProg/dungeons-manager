type GetProficiencyParams = {
  characterId?: number;
};

type UpdateProficiencyParams = {
  characterId: number;
  armors?: string;
  weapons?: string;
  tools?: string;
  languages?: string;
};
