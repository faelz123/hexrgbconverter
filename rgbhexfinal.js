//recebe o valor -> ex rgb(255,255,255) #FFFFFF
var entrada = prompt("Digite o RGB ou o Hexadecimal");

//recebe o valor
converter = (entrada) => {
  return checkRGBHEX(entrada);
};

//checa se é hex ou rgb
checkRGBHEX = (entrada) => {
  let valores = [];

  const hexValues = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
  };

  if (entrada.slice(0, 3) === "rgb") {
    let valoresHEX = [];
    conversaoRGBHEX(entrada, valores, valoresHEX, hexValues);
    return console.log(entrada + " = " + ("#" + valoresHEX.join("")));
  } else if (entrada.slice(0, 1) === "#") {
    let valoresRGB = [];
    conversaoHEXRGB(entrada, valores, valoresRGB, hexValues);
    return console.log(
      `${entrada} = rgb(${valoresRGB[2]},${valoresRGB[1]},${valoresRGB[0]})`
    );
  }
};

conversaoHEXRGB = (entrada, valores, valoresRGB, hexValues) => {
  arrayHEX(entrada, valores);
  converterHEXpDECIMAL(valores, hexValues);
  calculoHEXRGB(valores, valoresRGB);
};

conversaoRGBHEX = (entrada, valores, valoresHEX, hexValues) => {
  arrayRGB(entrada, valores);
  calculoRGBHEX(valores, valoresHEX);
  converterDECIMALpHEX(valoresHEX, hexValues);
};

////// HEX > RGB ////////

//cria array com os valores hexadecimais
arrayHEX = (entrada, valores) => {
  for (i = 1; i < entrada.length; i++) {
    valores.push(entrada[i]);
  }
};

converterHEXpDECIMAL = (valores, hexValues) => {
  for (i = 0; i < valores.length; i++) {
    for (const [key, value] of Object.entries(hexValues)) {
      if (key == valores[i]) {
        valores[i] = value;
      }
    }
  }
};

//calculo hex para rgb
calculoHEXRGB = (valores, valoresRGB) => {
  for (i = valores.length - 1; i > -1; i--) {
    let val = Number(valores[i]) + Number(valores[i - 1] * 16);
    valoresRGB.push(val);
    i = i - 1;
  }
};

/////// RGB > HEX ///////////

////cria array com valores decimais

arrayRGB = (entrada, valores) => {
  for (i = 0; i < entrada.length; i++) {
    for (l = i + 1; l < entrada.length; l++) {
      if (entrada[i] === "(" && entrada[l] === ",") {
        valores.push(Number(entrada.slice(i + 1, l)));
        i = l;
      } else if (entrada[i] === "," && entrada[l] === ",") {
        valores.push(Number(entrada.slice(i + 1, l)));
        i = l;
      } else if (entrada[i] === "," && entrada[l] === ")") {
        valores.push(Number(entrada.slice(i + 1, l)));
      }
    }
  }
};

///calculo decimal p hex

calculoRGBHEX = (valores, valoresHEX) => {
  for (i = 0; i < valores.length; i++) {
    let val1 = Math.floor(valores[i] / 16);
    let val2 = valores[i] % 16;
    valoresHEX.push(val1, val2);
  }
};

// converte DECIMAL > HEX
converterDECIMALpHEX = (valoresHEX, hexValues) => {
  for (i = 0; i < valoresHEX.length; i++) {
    for (const [key, value] of Object.entries(hexValues)) {
      if (value === valoresHEX[i]) {
        valoresHEX[i] = key;
      }
    }
  }
};
