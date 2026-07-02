export const PROCESS_CONFIGS: Record<
  number,
  { dimensionalSpecs: any[]; visualChecklists: any[] }
> = {
  1: {
    dimensionalSpecs: [
      { specName: "Desarrollo", expectedValue: "", realValue: "" },
      { specName: "Diámetro", expectedValue: "", realValue: "" },
      { specName: "Pared", expectedValue: "", realValue: "" },
    ],
    visualChecklists: [],
  },
  2: {
    dimensionalSpecs: [
      { specName: "P1 - ID/OD", expectedValue: "", realValue: "" },
      { specName: "P1 - Profundidad", expectedValue: "", realValue: "" },
      {
        specName: "P1 - Altura de flare",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "P1 - Ancho de beading o chaflán",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "P2 - ID/OD",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "P2 - Profundidad",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "P2 - Altura de flare",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "P2 - Ancho de beading o chaflán",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
    ],
    visualChecklists: [],
  },
  3: {
    dimensionalSpecs: [
      { specName: "Diámetro de perforación", expectedValue: "", realValue: "" },
      {
        specName: "Cantidad de perforacióin Incial",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "Distancia a perforación Inicial",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "Distancia a perforación Final",
        expectedValue: "",
        realValue: "",
      },
    ],
    visualChecklists: [
      {
        checkpointName:
          "¿Cumple con las referencias de las distancias entre perforaciones?",
        resultValue: 0,
      },
    ],
  },
  4: {
    dimensionalSpecs: [
      {
        specName: "Cantidad de lados rectos",
        expectedValue: "",
        realValue: "",
      },
      { specName: "Longitud 1° extremo", expectedValue: "", realValue: "" },
      { specName: "Longitud último extremo", expectedValue: "", realValue: "" },
    ],
    visualChecklists: [
      { checkpointName: "Configuración de pieza correcta", resultValue: 0 },
    ],
  },
  5: {
    dimensionalSpecs: [
      {
        specName: "Ex1 - Cantidad de perforaciones",
        expectedValue: "",
        realValue: "",
      },
      {
        specName: "Ex1 - Diámetro de perforación",
        expectedValue: "",
        realValue: "",
      },
      {
        specName: "Ex1 - Altura de extruido",
        expectedValue: "",
        realValue: "",
      },
      { specName: "Ex1 - Pared de extruido", expectedValue: "", realValue: "" },
      {
        specName: "Ex1 - Distancia de perforación",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "Ex2 - Cantidad de perforaciones",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "Ex2 - Diámetro de perforación",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "Ex2 - Altura de extruido",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "Ex2 - Pared de extruido",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "Ex2 - Distancia de perforación",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
    ],
    visualChecklists: [
      {
        checkpointName:
          "¿Cumple con las referencias de las distancias entre perforaciones?",
        resultValue: 0,
      },
    ],
  },
  6: {
    dimensionalSpecs: [
      {
        specName: "Longitud de Identación 1",
        expectedValue: "",
        realValue: "",
      },
      {
        specName: "Profundidad 1",
        expectedValue: "",
        realValue: "",
      },
      {
        specName: "Distancia de perforación a Identación",
        expectedValue: "",
        realValue: "",
      },
      {
        specName: "Longitud de Identación 2",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "Profundidad 2",
        expectedValue: "",
        realValue: "",
        isOptional: true,
      },
      {
        specName: "Distancia de perforación a Identación 2",
        expectedValue: "",
        realValue: "",
      },
    ],
    visualChecklists: [],
  },
  7: {
    dimensionalSpecs: [
      {
        specName: "Desarrollo previo al proceso",
        expectedValue: "",
        realValue: "",
      },
      {
        specName: "Desarrollo con proceso",
        expectedValue: "",
        realValue: "",
      },
    ],
    visualChecklists: [],
  },
  8: {
    dimensionalSpecs: [],
    visualChecklists: [
      {
        checkpointName: "Conicide el ID del contenedor vs ID de la pieza",
        resultValue: 0,
      },
      {
        checkpointName: "Procesos completos (Pieza física vs dibujo)",
        resultValue: 0,
      },
      {
        checkpointName: "Configuración de la pieza OK (Pieza física vs dibujo)",
        resultValue: 0,
      },
      { checkpointName: "Se detectan defectos de Soldadura", resultValue: 0 },
      { checkpointName: "PP según BOM", resultValue: 0 },
      { checkpointName: "% de soldadura correcto", resultValue: 0 },
      { checkpointName: "Vista frontal correcta", resultValue: 0 },
      { checkpointName: "Vista lateral correcta", resultValue: 0 },
      { checkpointName: "Vista superior correcta", resultValue: 0 },
      { checkpointName: "Vista isométrica correcta", resultValue: 0 },
    ],
  },
  10: {
    dimensionalSpecs: [],
    visualChecklists: [
      {
        checkpointName: "Coincide el ID del contenedor vs ID de la pieza",
        resultValue: 0,
      },
      { checkpointName: "Procesos completos", resultValue: 0 },
      { checkpointName: "Configuración correcta", resultValue: 0 },
    ],
  },
  11: {
    dimensionalSpecs: [
      {
        specName: "Distancia C",
        expectedValue: "",
        realValue: "",
      },
      {
        specName: "Distancia D (Extremo de tubería a inicio de dimple)",
        expectedValue: "",
        realValue: "",
      },
    ],
    visualChecklists: [],
  },
  12: {
    dimensionalSpecs: [
      {
        specName: "Distancia D1",
        expectedValue: "",
        realValue: "",
      },
      {
        specName: "Distancia D2",
        expectedValue: "",
        realValue: "",
      },
      {
        specName: "Distancia D3",
        expectedValue: "",
        realValue: "",
      },
      {
        specName: "Diámetro 1",
        expectedValue: "",
        realValue: "",
      },
      {
        specName: "Diámetro 2",
        expectedValue: "",
        realValue: "",
      },
    ],
    visualChecklists: [],
  },
};
