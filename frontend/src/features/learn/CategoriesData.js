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
      "Café molido y posos de té",
      "Hojas, ramas y restos de jardinería",
      "Cáscaras de huevo",
      "Pan y productos de panadería viejos",
      "Restos de verduras crudas",
      "Flores y plantas marchitas",
      "Semillas y pepas de frutas",
      "Aserrín y virutas de madera natural",
      "Residuos de poda de árboles pequeños",
      "Restos de infusiones (mate, manzanilla)",
    ],
    binColor: "Verde",
    decompositionTime:
      "2 semanas a 6 meses (depende de condiciones locales y tipo de material)",
    tips: [
      "Separa los orgánicos en un contenedor aparte con tapa",
      "Si es posible, compostarlos en casa o llevarlos a puntos de compostaje",
      "No mezclar con plásticos ni con residuos peligrosos",
      "Evita agregar aceites o grasas en exceso",
      "En Cochabamba, verifica si tu zona tiene recolección diferenciada",
    ],
    impact:
      "Los orgánicos pueden transformarse en compost y reducir la disposición final.",
    environmentalImpact: {
      positive:
        "Al compostar, se produce abono natural que mejora la calidad del suelo, reduce el uso de fertilizantes químicos y disminuye hasta un 40% los residuos que llegan a los rellenos sanitarios.",
      negative:
        "Si se mezclan con basura general, generan metano (gas de efecto invernadero 25 veces más potente que el CO2) en vertederos, lixiviados contaminantes y malos olores. En Cochabamba, representan aproximadamente el 50% de la basura doméstica.",
      cochabambaContext:
        "En el Valle Alto de Cochabamba existen iniciativas de compostaje comunitario. El relleno sanitario K'ara K'ara recibe grandes cantidades de orgánicos que podrían aprovecharse mejor.",
    },
  },
  {
    id: 2,
    name: "Plásticos",
    icon: "♻️",
    trashColorName: "Yellow",
    color: "bg-yellow-500",
    description: "Envases y productos plásticos - PET, PE, PP, PS",
    examples: [
      "Botellas PET de bebidas",
      "Envases de shampoo y limpieza",
      "Bolsas plásticas limpias",
      "Tapas y tapones plásticos",
      "Envoltorios de snacks (limpios)",
      "Contenedores de yogurt",
      "Vasos desechables de plástico",
      "Botellas de aceite vegetal",
      "Envases de productos lácteos",
      "Bandejas de alimentos (limpias)",
      "Tubos de pasta dental (plástico)",
      "Empaques de productos de limpieza",
    ],
    binColor: "Amarillo",
    decompositionTime: "100 a 1000 años según el tipo de plástico",
    tips: [
      "Enjuaga y aplasta botellas para ahorrar espacio",
      "Separa PET si la municipalidad lo solicita (contenedor anaranjado)",
      "Quita restos de comida y etiquetas si es requerido localmente",
      "Acumula tapas plásticas para campañas de reciclaje",
      "En Cochabamba, busca centros de acopio que compren PET",
    ],
    impact: "Reciclar plástico reduce consumo energético y contaminación.",
    environmentalImpact: {
      positive:
        "Reciclar 1 tonelada de plástico ahorra 5,774 kWh de energía y evita la emisión de 1.5 toneladas de CO2. El PET reciclado se usa para nuevas botellas, textiles y otros productos.",
      negative:
        "Los plásticos contaminan ríos (como el Rocha en Cochabamba), océanos y suelos. Los microplásticos entran en la cadena alimentaria. Solo el 9% del plástico mundial se recicla. En Bolivia, gran parte termina en botaderos.",
      cochabambaContext:
        "El río Rocha arrastra toneladas de plásticos. Existen recicladoras locales como EMSA que recuperan PET. Las bolsas plásticas son uno de los principales contaminantes visuales en la ciudad.",
    },
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
      "Hojas de papel de oficina",
      "Envases de cartón (cereales, leche)",
      "Cuadernos sin espiral metálico",
      "Folletos y propaganda",
      "Sobres sin ventana plástica",
      "Cartulinas y papel kraft",
      "Cajas de zapatos",
      "Tubos de papel higiénico y toallas",
      "Papel de envolver (sin plástico)",
      "Libros viejos (sin tapa dura)",
    ],
    binColor: "Azul",
    decompositionTime:
      "2 a 6 meses si está seco; no reciclar si está muy sucio o grasiento",
    tips: [
      "Mantén el papel seco y limpio",
      "Aplana y pliega cajas de cartón",
      "No recicles papel con grasa, cera o restos de comida",
      "Retira grapas y clips metálicos",
      "En Cochabamba, los recicladores informales compran papel y cartón",
    ],
    impact:
      "Reciclar papel evita tala de árboles y ahorro de recursos hídricos y energético.",
    environmentalImpact: {
      positive:
        "Reciclar 1 tonelada de papel salva 17 árboles, ahorra 26,000 litros de agua y 4,000 kWh de energía. Reduce la contaminación del aire en un 74% y del agua en un 35% comparado con papel nuevo.",
      negative:
        "La producción de papel virgen causa deforestación, consume grandes cantidades de agua y energía, y genera gases de efecto invernadero. El papel en vertederos produce metano al descomponerse sin oxígeno.",
      cochabambaContext:
        "En Cochabamba, los 'cartoneros' recuperan cartón de mercados y comercios. La demanda de papel reciclado es alta, pero falta cultura de separación en origen.",
    },
  },
  {
    id: 4,
    name: "Vidrio y Metales",
    icon: "🍾",
    trashColorName: "Grey",
    color: "bg-gray-600",
    description: "Botellas y envases de vidrio y objetos metálicos",
    examples: [
      "Botellas de cerveza y refrescos",
      "Frascos de conservas y mermeladas",
      "Latas de aluminio (cerveza, refrescos)",
      "Latas de acero (atún, duraznos)",
      "Tapas metálicas de botellas",
      "Envases de vidrio de alimentos",
      "Botellas de vino y licores",
      "Frascos de café instantáneo",
      "Chatarra metálica pequeña",
      "Alambre y cables (sin plástico)",
      "Ollas y sartenes viejos",
      "Herramientas metálicas en desuso",
    ],
    binColor: "Plomo / Gris",
    decompositionTime:
      "Vidrio: 4,000 años o más; Aluminio: 200-500 años; Acero: 10-100 años",
    tips: [
      "Enjuaga envases antes de depositar",
      "Separa vidrio de metales si la planta local lo solicita",
      "No incluir vidrios de ventanas, espejos o cerámicas",
      "Las latas de aluminio son muy valiosas para recicladores",
      "En Cochabamba, muchos recicladores compran metales a buen precio",
    ],
    impact:
      "Vidrio y metales son altamente reciclables y ahorran recursos y energía.",
    environmentalImpact: {
      positive:
        "El vidrio es 100% reciclable infinitamente. Reciclar aluminio ahorra 95% de energía vs. producir aluminio nuevo. Reciclar acero ahorra 74% de energía. No pierde calidad en el proceso.",
      negative:
        "El vidrio no se degrada pero contamina visualmente. Las latas abandonadas pueden causar heridas. La minería para obtener aluminio (bauxita) causa deforestación y contamina ríos con metales pesados.",
      cochabambaContext:
        "En Cochabamba existe un sistema informal de recuperación de vidrio (cervecerías pagan retorno de botellas). Los metales tienen buen valor comercial en chatarreras locales.",
    },
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
      "Pañales desechables usados",
      "Toallas sanitarias y tampones",
      "Papel higiénico usado",
      "Colillas de cigarrillos",
      "Chicles y dulces pegajosos",
      "Papel carbón y papel fotográfico",
      "Envases muy sucios con restos de comida",
      "Cerámica y porcelana rota",
      "Esponjas de cocina usadas",
      "Residuos de barrido mezclados",
      "Cartón encerado o plastificado",
      "Envases tetrapak muy sucios",
    ],
    binColor: "Negro",
    decompositionTime:
      "Variable: pañales 300-500 años, colillas 1-2 años, chicles 5 años",
    tips: [
      "Evitar mezclar materiales reciclables con residuos generales",
      "Reducir generación en origen (menos empaques desechables)",
      "Consultar recolección municipal para materiales especiales",
      "Considera usar pañales de tela y productos reutilizables",
      "En Cochabamba, esta fracción va al relleno K'ara K'ara",
    ],
    impact:
      "Reducir estos residuos reduce carga a vertederos y costos de disposición final.",
    environmentalImpact: {
      positive:
        "Reducir esta fracción mediante prevención (productos reutilizables) disminuye la cantidad total de residuos y los costos de recolección y disposición final.",
      negative:
        "Ocupan espacio en rellenos sanitarios, generan lixiviados tóxicos, producen gases de efecto invernadero y pueden contaminar suelos y aguas subterráneas. Los pañales representan el 10% de los residuos domésticos.",
      cochabambaContext:
        "El relleno sanitario K'ara K'ara en Cochabamba está cerca de su límite de capacidad. Reducir residuos no aprovechables es crucial para prolongar su vida útil y proteger el acuífero de la zona.",
    },
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
      "Pilas alcalinas y baterías recargables",
      "Medicamentos vencidos o sin usar",
      "Pinturas, barnices y solventes",
      "Aerosoles y ambientadores en spray",
      "Productos de limpieza químicos",
      "Termómetros de mercurio",
      "Lámparas fluorescentes y focos ahorradores",
      "Aceites de motor usados",
      "Insecticidas y raticidas",
      "Baterías de celulares y laptops",
      "Cartuchos de impresora",
      "Radiografías médicas",
    ],
    binColor: "Rojo / contenedores especiales",
    decompositionTime:
      "Variable; altamente contaminante si se dispone incorrectamente. Pilas: 500-1000 años",
    tips: [
      "NO depositar NUNCA en los contenedores comunes",
      "Llevar a puntos de acopio habilitados o campañas municipales",
      "Almacenar de forma segura hasta su entrega en lugar fresco y seco",
      "En Cochabamba, consultar con farmacias para medicamentos",
      "EMSA organiza campañas periódicas de recolección de peligrosos",
    ],
    impact:
      "Manejo inadecuado contamina suelos y aguas; existen puntos de recolección especiales.",
    environmentalImpact: {
      positive:
        "El manejo adecuado evita contaminación severa de suelos y aguas. Algunos componentes pueden recuperarse (mercurio, metales pesados) para reúso industrial controlado.",
      negative:
        "Una sola pila puede contaminar 600,000 litros de agua. Los metales pesados (plomo, mercurio, cadmio) causan daños irreversibles en ecosistemas y salud humana (cáncer, daño neurológico). Las pinturas liberan VOCs tóxicos.",
      cochabambaContext:
        "En Cochabamba no existe gestión integral de peligrosos. Muchos terminan en K'ara K'ara o ríos. La UMSS y algunas farmacias tienen puntos de acopio limitados. Urge mejorar la infraestructura de recolección.",
    },
  },
];
