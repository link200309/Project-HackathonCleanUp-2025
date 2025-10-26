export const wasteCategories = [
  {
    id: 1,
    name: "Residuos Orgánicos",
    icon: "🍎",
    color: "bg-green-600",
    trashColorName: "Green",
    description: "Restos de alimentos, poda y material biodegradable",
    examples: [
      "Cáscaras de frutas y verduras",
      "Restos de alimentos cocinados",
      "Café molido y posos",
      "Hojas, ramas y restos de jardinería",
      "Pequeños restos de comida",
    ],
    binColor: "Verde",
    decompositionTime: "Semanas a meses (depende condiciones locales)",
    tips: [
      "Separa los orgánicos en un contenedor aparte",
      "Si es posible, compostarlos en casa o en puntos de compostaje",
      "No mezclar con plásticos ni con residuos peligrosos",
    ],
    impact:
      "Los orgánicos pueden transformarse en compost y reducir la disposición final.",
  },
  {
    id: 2,
    name: "Plásticos",
    icon: "♻️",
    trashColorName: "Yellow",
    color: "bg-yellow-500",
    description:
      "Envases y productos plásticos - PET, PE, PP, PS",
    examples: [
      "Botellas PET",
      "Envases de shampoo y limpieza",
      "Bolsas plásticas limpias",
      "Tapas y envoltorios",
      "Contenedores de comida plásticos",
    ],
    binColor: "Amarillo",
    decompositionTime: "Decenas a cientos de años (según tipo)",
    tips: [
      "Enjuaga y aplasta botellas para ahorrar espacio",
      "Separa PET si la municipalidad lo solicita (anaranjado)",
      "Quita restos de comida y etiquetas si es requerido localmente",
    ],
    impact: "Reciclar plástico reduce consumo energético y contaminación.",
  },
  {
    id: 3,
    name: "Papel y Cartón",
    icon: "📄",
    trashColorName: "Blue",
    color: "bg-sky-600",
    description: "Papeles, periódicos, revistas, cajas y cartón limpio",
    examples: [
      "Periódicos y revistas",
      "Cajas de cartón plegadas",
      "Hojas de papel limpias",
      "Envases de cartón (secos)",
      "Cuadernos sin residuos orgánicos",
    ],
    binColor: "Azul",
    decompositionTime:
      "Meses (si está seco); no reciclar si muy sucio/grasiento",
    tips: [
      "Mantén el papel seco y limpio",
      "Aplana y pliega cajas",
      "No recicles papel con grasa o restos de comida",
    ],
    impact:
      "Reciclar papel evita tala de árboles y ahorro de recursos hídricos y energético.",
  },
  {
    id: 4,
    name: "Vidrio y Metales",
    icon: "🍾",
    trashColorName: "Grey",
    color: "bg-gray-600",
    description:
      "Botellas y envases de vidrio y objetos metálicos",
    examples: [
      "Botellas de bebidas",
      "Frascos de conservas",
      "Latas de aluminio y acero",
      "Tapas metálicas",
      "Envases metálicos pequeños",
    ],
    binColor: "Plomo / Gris",
    decompositionTime:
      "Vidrio: miles de años; metales: variable (décadas a siglos)",
    tips: [
      "Enjuaga envases antes de depositar",
      "Separa por tipo si la planta local lo solicita",
      "No incluir vidrios de ventanas o cerámicas en envases",
    ],
    impact:
      "Vidrio y metales son altamente reciclables y ahorran recursos y energía.",
  },
  {
    id: 5,
    name: "Residuos No Aprovechables",
    icon: "🗑️",
    trashColorName: "Black",
    color: "bg-black",
    description:
      "Residuos destinados a disposición final que no son aprovechables",
    examples: [
      "Restos sucios o mezclados que no se pueden reciclar",
      "Desechos de barrido sin separación",
      "Pañales y productos de higiene",
      "Residuos sanitarios (no clínicos)",
    ],
    binColor: "Negro",
    decompositionTime: "Variable",
    tips: [
      "Evitar mezclar materiales reciclables con residuos generales",
      "Reducir generación en origen (menos empaques)",
      "Consultar recolección municipal para materiales especiales",
    ],
    impact:
      "Reducir estos residuos reduce carga a vertederos y costos de disposición final.",
  },
  {
    id: 6,
    name: "Residuos Peligrosos",
    icon: "⚠️",
    trashColorName: "Red",
    color: "bg-red-500",
    description:
      "Materiales que requieren manejo y puntos de recolección especiales",
    examples: [
      "Pilas y baterías",
      "Medicamentos vencidos",
      "Pinturas y solventes",
      "Aerosoles y químicos domésticos",
      "Residuos electrónicos (pequeños RAEE)",
    ],
    binColor:
      "Rojo / especiales",
    decompositionTime:
      "Variable; altamente contaminante si se dispone incorrectamente",
    tips: [
      "NO depositar en los contenedores comunes",
      "Llevar a puntos de acopio habilitados o campañas municipales",
      "Almacenar de forma segura hasta su entrega",
    ],
    impact:
      "Manejo inadecuado contamina suelos y aguas; existen puntos de recolección especiales.",
  },
];
