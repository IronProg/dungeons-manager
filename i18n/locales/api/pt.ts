export const api = {
  authError: {
    notFoundInDatabase: 'Usuário não encontrado. Verifique seu e-mail e senha.',
    invalid: 'E-mail ou senha inválidos.',
    unauthenticated:
      'Você precisa fazer login ou registrar-se antes de prosseguir.',
    unconfirmed: 'Sua conta ainda não foi confirmada. Verifique seu e-mail.',
    locked:
      'Sua conta está bloqueada devido a várias tentativas de login malsucedidas.',
    expired:
      'Sua sessão expirou. Por favor, faça login novamente para continuar.',
    alreadyAuthenticated: 'Você já está logado.',
    timeout: 'Sua sessão expirou. Por favor, faça login novamente.',
    inactive: 'Sua conta ainda não foi ativada.',
    notApproved: 'Sua conta ainda não foi aprovada por um administrador.',
    lastAttempt:
      'Você tem mais uma tentativa antes de sua conta ser bloqueada.',
  },
  errors: {
    default_field_error: 'Erro ao salvar registro',
    too_long: '%{attribute} não pode ultrapassar %{count} caracteres',
    too_short: '%{attribute} deve ter no mínimo %{count} caracteres',
    greater_than_or_equal_to:
      '%{attribute} deve ser igual ou maior que %{count}',
    less_than_or_equal_to: '%{attribute} deve ser no máximo %{count}',
    blank: '%{attribute} não pode ficar em branco',
    inclusion: '%{attribute} não é uma opção válida',
    taken: '%{attribute} já está em uso',
    not_a_number: '%{attribute} precisa ser um número',
  },
  models: {
    user: {
      email: 'E-mail',
      password: 'Senha',
    },
    character: {
      name: 'Nome',
      proficiencyBonus: 'Bônus de Proficiência',
      experience: 'Experiência',
      level: 'Nível',
    },
    characterGeneralInfo: {
      initiativeCustomBonus: 'Bônus de Iniciativa',
      passivePerceptionCustomBonus: 'Bônus de Percepção Passiva',
      armorClassBase: 'Classe de Armadura (Base)',
      exhaustion: 'Exaustão',
      hitDices: 'Dados de Vida',
      hitDicesMaximum: 'Máximo de Dados de Vida',
      hitPoints: 'Pontos de Vida',
      hitPointsLimit: 'Limite de Vida',
      speed: 'Deslocamento',
      speedClimbing: 'Deslocamento de Escalada',
      speedFlying: 'Deslocamento de Voo',
    },
    attack: {
      name: 'Nome do Ataque',
      range: 'Alcance',
      properties: 'Propriedades',
      description: 'Descrição',
      customBonus: 'Bônus Personalizado',
      applyProficiency: 'Aplicar Proficiência',
      damages: {
        customBonus: 'Bônus de Dano',
        kind: 'Tipo de Dano',
        diceSize: 'Tipo do Dado',
        diceAmount: 'Quantidade de Dados',
      },
    },
    background: {
      alignment: 'Alinhamento',
      background: 'Antecedente',
      race: 'Raça',
      bonds: 'Vínculos',
      flaws: 'Defeitos',
      ideals: 'Ideais',
      personalityTraits: 'Traços de Personalidade',
    },
    characterAttribute: {
      modifier: 'Modificador',
      value: 'Valor',
      tempValue: 'Valor Temporário',
    },
    currency: {
      copperPoints: 'PC',
      silverPoints: 'PP',
      electrumPoints: 'PE',
      goldPoints: 'PO',
      platinumPoints: 'PL',
    },
    damage: {
      customBonus: 'Bônus de Dano',
      kind: 'Tipo de Dano',
      diceSize: 'Tipo do Dado',
      diceAmount: 'Quantidade de Dados',
    },
    equipment: {
      name: 'Nome do Item',
      description: 'Descrição',
      amount: 'Quantidade',
    },
    feature: {
      title: 'Título da Característica',
      origin: 'Origem',
      description: 'Descrição',
    },
    note: {
      text: 'Texto da Anotação',
    },
    proficiency: {
      armors: 'Armaduras',
      languages: 'Idiomas',
      tools: 'Ferramentas',
      weapons: 'Armas',
    },
    resource: {
      name: 'Nome do Recurso',
      amount: 'Quantidade Atual',
      max: 'Quantidade Máxima',
    },
    skill: {
      name: 'Nome da Perícia',
      mainAttribute: 'Atributo Base',
      customBonus: 'Bônus Customizado',
      proficiency: 'Proficiência',
      expertise: 'Especialização',
    },
    savingThrow: {
      mainAttribute: 'Atributo de Salvaguarda',
      customBonus: 'Bônus Customizado',
      proficiency: 'Proficiência',
    },
  },
};
