// Mediana
const mediana = (marcadores) => {
  const listMarcadores = marcadores.sort(function(a,b){
    return a - b;})
  if (listMarcadores.length%2!==0){
    const resul = parseInt(listMarcadores.length/2);
    return listMarcadores[resul]; 
  }else{
    const resul1 = parseInt(listMarcadores.length/2);
    const resul2 = resul1-1;
    return (listMarcadores[resul2]+listMarcadores[resul1])/2;
  }
};
// Moda
const moda = (marcadores) => {
  const resul = {};
  marcadores.map(function(eve){
    if(!resul[eve]){
      resul[eve] = 1;
    }else{
      resul[eve] += 1;
    }
  });
  const listaMayor = Object.entries(resul).sort(function(a,b){return b[1]-a[1]});
  if (listaMayor[0][1]===listaMayor[1][1]){
    return [listaMayor[0][0],listaMayor[1][0]];
  }else{
    return listaMayor[0][0];
  }
};

// Porcentaje
const porcentaje = (list,opc1)=>{
  const listResul = Object.entries(list);
  const resul = listResul.map(function(ele){
    return ele[1];
  });
  const suma = resul.reduce(function(a,ele){
    return a+ele;
  });
  return [((list[opc1]/suma)*100).toFixed(2),suma,list];
};

// Filtrando Eventos Segun Cuotas de los Equipos
const filtrarCuotas = (opc1,opc2,equipo) => {
  const dateFilter = dateSoccer.filter(function(eve){
    if (eve[equipo]>=opc1&&eve[equipo]<=opc2){
      return eve;
    }
  });
  return dateFilter;
};

//  Pasando Marcadores 1 Tiempo y Final de Partido a enteros
const filtrandoEventos = (opc1,opc2,equipo)=>{
  const datesFilters = filtrarCuotas(opc1,opc2,equipo)
  const eventos = datesFilters.map(function(artic){
    const eve = artic;
    let score1T = artic.marcador1Tiempo.split("-");
    let scoreFin = artic.marcadorFinal.split("-");
    eve['local1T'] = parseInt(score1T[0]);
    eve['visita1T'] = parseInt(score1T[1]);
    eve['localFin'] = parseInt(scoreFin[0]);
    eve['visitaFin'] = parseInt(scoreFin[1]);
    return eve;
  });
  return eventos
};

// listar datos del ganador en 1 tiempo y final Partido
const ganadores = (eventos,local,visita) => {
  const resulGanador = {local:0,empate:0,visita:0};
  eventos.forEach(function(art){
    if (art[local]>art[visita]){
      resulGanador['local'] += 1;     
    }
    else if(art[local]===art[visita]){
      resulGanador['empate'] += 1;
    }
    else {
      resulGanador['visita'] += 1;
    }
  })
  return resulGanador;
};

// Ganador 1 Tiempo - ganador todo el partido
const ganador1TFinal = (eventos) => {
  const resulGanador = {
    localLocal:0,
    empateLocal:0,
    visitaLocal:0,
    localEmpate:0,
    empateEmpate:0,
    visitaEmpate:0,
    localVisita:0,
    empateVisita:0,
    visitaVisita:0,
  };
  eventos.forEach(function(art){
    switch (true) {
      case art['local1T']>art['visita1T'] && art['localFin']>art['visitaFin']:
        resulGanador['localLocal'] += 1;
        break;
      case art['local1T']===art['visita1T'] && art['localFin']>art['visitaFin']:
        resulGanador['empateLocal'] += 1;
        break;
      case art['local1T']<art['visita1T'] && art['localFin']>art['visitaFin']:
        resulGanador['visitaLocal'] += 1;
        break;
      case art['local1T']>art['visita1T'] && art['localFin']===art['visitaFin']:
        resulGanador['localEmpate'] += 1;
        break;
      case art['local1T']===art['visita1T'] && art['localFin']===art['visitaFin']:
        resulGanador['empateEmpate'] += 1;
        break;
      case art['local1T']<art['visita1T'] && art['localFin']===art['visitaFin']:
        resulGanador['visitaEmpate'] += 1;
        break;
      case art['local1T']>art['visita1T'] && art['localFin']<art['visitaFin']:
        resulGanador['localVisita'] += 1;
        break;
      case art['local1T']===art['visita1T'] && art['localFin']<art['visitaFin']:
        resulGanador['empateVisita'] += 1;
        break;
      default:
        resulGanador['visitaVisita'] += 1;
    }
  })
  return resulGanador;  
};

// listar total marcadores 1 Tiempo y Tiempo completo
const totalGoles = (eventos,opc1,opc2) => {
  if (opc2.includes('visita1T') || opc2.includes('visitaFin')) {
    const listaGoles = eventos.map(function(eve){
      return eve[opc1] + eve[opc2];
    });
    const suma = listaGoles.reduce(function(a,b){
      return a+b;
    });
    return [listaGoles,suma];
  }else{
    const listaGoles = eventos.map(function(eve){
      return eve[opc1];
    });
    const suma = listaGoles.reduce(function(a,b){
      return a+b;
    });
    return [listaGoles,suma];
  }
};
const resulMarcador = (eventos,opc1)=>{
  const marcadores = eventos.map(function (e){
    return e[opc1];
  });
  return marcadores;
};
// Mostrar resultado en Pantalla
const textoPorcentaje = (resul,even,cant,logros)=>{
  document.getElementById("resultados").innerHTML = `Total Eventos ${cant}.<br>Logros ${logros}.<br> El Porcentaje de Resultados:<br>${even} es % ${resul}.`;
};
const textoMediana = (resul,even,goles,tiempo)=>{
  document.getElementById('resultados').innerHTML = `Total Eventos ${even}.<br>Total Goles: ${goles}.<br>La Mediana de Goles en ${tiempo}:<br>${resul} Gol.`;
};
const textoModa = (resul,even,marca,tiempo)=>{
  document.getElementById('resultados').innerHTML = `Total Eventos ${even}.<br>La Moda de ${marca} en ${tiempo}:<br>${resul} ${marca}.`;
};

// dar resultado de la opciones Ganadores en Porcentaje
const opcionesGanadoresPorcentaje = (opciones,evenFiltrados)=>{
  switch(true){
    case opciones===1:
      var listaResul = ganadores(evenFiltrados,'local1T','visita1T');
      var resulPorcen = porcentaje(listaResul,'local');
      textoPorcentaje(resulPorcen[0],'Primer Tiempo Ganados Local',resulPorcen[1],resulPorcen[2].local);
      break;
    case opciones===2:
      var listaResul = ganadores(evenFiltrados,'local1T','visita1T');
      var resulPorcen = porcentaje(listaResul,'empate');
      textoPorcentaje(resulPorcen[0],'Primer Tiempo en Empate',resulPorcen[1],resulPorcen[2].empate);
      break;
    case opciones===3:
      var listaResul = ganadores(evenFiltrados,'local1T','visita1T');
      var resulPorcen = porcentaje(listaResul,'visita');
      textoPorcentaje(resulPorcen[0],'Primer Tiempo Ganados Visita',resulPorcen[1],resulPorcen[2].visita);
      break;
    case opciones===4:
      var listaResul = ganadores(evenFiltrados,'localFin','visitaFin');
      var resulPorcen = porcentaje(listaResul,'local');
      textoPorcentaje(resulPorcen[0],'Tiempo Completo Ganados Local',resulPorcen[1],resulPorcen[2].local);
      break;
    case opciones===5:
      var listaResul = ganadores(evenFiltrados,'localFin','visitaFin');
      var resulPorcen = porcentaje(listaResul,'empate');
      textoPorcentaje(resulPorcen[0],'Tiempo Completo en Empate',resulPorcen[1],resulPorcen[2].empate);
      break;
    case opciones===6:
      var listaResul = ganadores(evenFiltrados,'localFin','visitaFin');
      var resulPorcen = porcentaje(listaResul,'visita');
      textoPorcentaje(resulPorcen[0],'Tiempo Completo Ganados Visita',resulPorcen[1],resulPorcen[2].visita);
      break;
  }
};

// dar resultado de la opciones Ganadores en Porcentaje
const primerTiempoFinalPorcentaje = (opciones,evenFiltrados)=>{
  switch(true){
    case opciones===7:
      var listaResul = ganador1TFinal(evenFiltrados);
      var resulPorcen = porcentaje(listaResul,'localLocal');
      textoPorcentaje(resulPorcen[0],'Local / Local',resulPorcen[1],resulPorcen[2].localLocal);
      break;
    case opciones===8:
      var listaResul = ganador1TFinal(evenFiltrados);
      var resulPorcen = porcentaje(listaResul,'localEmpate');
      textoPorcentaje(resulPorcen[0],'Local / Empate',resulPorcen[1],resulPorcen[2].localEmpate);
      break;
    case opciones===9:
      var listaResul = ganador1TFinal(evenFiltrados);
      var resulPorcen = porcentaje(listaResul,'localVisita');
      textoPorcentaje(resulPorcen[0],'Local / Visita',resulPorcen[1],resulPorcen[2].localVisita);
      break;
    case opciones===10:
      var listaResul = ganador1TFinal(evenFiltrados);
      var resulPorcen = porcentaje(listaResul,'empateLocal');
      textoPorcentaje(resulPorcen[0],'Empate / Local',resulPorcen[1],resulPorcen[2].empateLocal);
      break;
    case opciones===11:
      var listaResul = ganador1TFinal(evenFiltrados);
      var resulPorcen = porcentaje(listaResul,'empateEmpate');
      textoPorcentaje(resulPorcen[0],'Empate / Empate',resulPorcen[1],resulPorcen[2].empateEmpate);
      break;
    case opciones===12:
      var listaResul = ganador1TFinal(evenFiltrados);
      var resulPorcen = porcentaje(listaResul,'empateVisita');
      textoPorcentaje(resulPorcen[0],'Empate / Visita',resulPorcen[1],resulPorcen[2].empateVisita);
      break;
    case opciones===13:
      var listaResul = ganador1TFinal(evenFiltrados);
      var resulPorcen = porcentaje(listaResul,'visitaLocal');
      textoPorcentaje(resulPorcen[0],'Visita / Local',resulPorcen[1],resulPorcen[2].visitaLocal);
      break;
    case opciones===14:
      var listaResul = ganador1TFinal(evenFiltrados);
      var resulPorcen = porcentaje(listaResul,'visitaEmpate');
      textoPorcentaje(resulPorcen[0],'Visita / Empate',resulPorcen[1],resulPorcen[2].visitaEmpate);
      break;
    case opciones===15:
      var listaResul = ganador1TFinal(evenFiltrados);
      var resulPorcen = porcentaje(listaResul,'visitaVisita');
      textoPorcentaje(resulPorcen[0],'Visita / Visita',resulPorcen[1],resulPorcen[2].visitaVisita);
      break;
  }
};

const golesMediana = (opciones,evenFiltrados)=>{
  switch(true) {
    case opciones===16:
      var tiempo = 'Primer Tiempo';
      var resulGoles = totalGoles(evenFiltrados,'local1T','visita1T');
      var resulMediana = mediana(resulGoles[0]);
      textoMediana(resulMediana,resulGoles[0].length,resulGoles[1],tiempo);
      break;
    case opciones===17:
      var tiempo = 'Tiempo Completo';
      var resulGoles = totalGoles(evenFiltrados,'localFin','visitaFin');
      var resulMediana = mediana(resulGoles[0]);
      textoMediana(resulMediana,resulGoles[0].length,resulGoles[1],tiempo);
      break;
    case opciones===18:
      var tiempo = 'Primer Tiempo';
      var resulGoles = totalGoles(evenFiltrados,'local1T','');
      var resulMediana = mediana(resulGoles[0]);
      textoMediana(resulMediana,resulGoles[0].length,resulGoles[1],tiempo);
      break;
    case opciones===19:
      var tiempo = 'Primer Tiempo';
      var resulGoles = totalGoles(evenFiltrados,'visita1T','');
      var resulMediana = mediana(resulGoles[0]);
      textoMediana(resulMediana,resulGoles[0].length,resulGoles[1],tiempo);
      break;
    case opciones===20:
      var tiempo = 'Tiempo Completo';
      var resulGoles = totalGoles(evenFiltrados,'localFin','');
      var resulMediana = mediana(resulGoles[0]);
      textoMediana(resulMediana,resulGoles[0].length,resulGoles[1],tiempo);
      break;
    case opciones===21:
      var tiempo = 'Tiempo Completo';
      var resulGoles = totalGoles(evenFiltrados,'visitaFin','');
      var resulMediana = mediana(resulGoles[0]);
      textoMediana(resulMediana,resulGoles[0].length,resulGoles[1],tiempo);
      break;
  };
};
const golesModa = (opciones,evenFiltrados)=>{
  var tiempo = (opciones===22)?"Primer Tiempo":"Tiempo Completo"
  switch(true) {
    case opciones===22:
      var marcador = resulMarcador(evenFiltrados,'marcador1Tiempo');
      var resulModa = moda(marcador);
      var marca = (resulModa.length===1)?"marcador":"marcadores";
      textoModa(resulModa,marcador.length,marca,tiempo);
      break;
    case opciones===23:
      var marcador = resulMarcador(evenFiltrados,'marcadorFinal');
      var resulModa = moda(marcador);
      var marca = (resulModa.length===1)?"marcador":"marcadores";
      textoModa(resulModa,marcador.length,marca,tiempo);
      break;
  };
};

// Boton resultado
const pronosticarBoton = () => {
  const cuotaMayor = parseFloat(document.getElementById("cuota-mas").value);
  const cuotaMenor = parseFloat(document.getElementById("cuota-menos").value);
  if (!cuotaMayor||!cuotaMenor){
    throw document.getElementById('resultados').innerHTML = `Ingresa un numero en los espacios de Cuota Mayor o Cuota Menor`
  }
  const equipo = document.getElementById("equipo").value;
  const opciones = Number(document.getElementById("opciones").value);
  const evenFiltrados = filtrandoEventos(cuotaMayor,cuotaMenor,equipo);
  if (opciones>=1&&opciones<=6){
    opcionesGanadoresPorcentaje(opciones,evenFiltrados);
  }else if (opciones>=7&&opciones<=15) {
    primerTiempoFinalPorcentaje(opciones,evenFiltrados);
  }else if (opciones>=16&&opciones<=21){
    golesMediana(opciones,evenFiltrados);
  }else{
    golesModa(opciones,evenFiltrados);
  }

};

const dateSoccer = [
  {
    equipoLocal: "PAOK Thessaloniki U19",
    equipoVisita: "Panaitolikos U19",
    local: 1.18,
    empate: 5.25,
    visita: 12,
    marcador1Tiempo: "1-0",
    marcadorFinal: "2-0"
  },
  {
    equipoLocal: "CD Coria",
    equipoVisita: "CF Panaderia Pulido",
    local: 1.28,
    empate: 4.33,
    visita: 9.5,
    marcador1Tiempo: "1-1",
    marcadorFinal: "1-2"
  },
  {
    equipoLocal: "FK Apos Blansko",
    equipoVisita: "Vysocina Jihlava B",
    local: 1.28,
    empate: 5,
    visita: 7,
    marcador1Tiempo: "1-0",
    marcadorFinal: "3-1"
  },
  {
    equipoLocal: "FC Viktoria Plzen B",
    equipoVisita: "SK Rakovnik",
    local: 1.3,
    empate: 5,
    visita: 6.5,
    marcador1Tiempo: "0-0",
    marcadorFinal: "2-0"
  },
  {
    equipoLocal: "Lamphun Warrior",
    equipoVisita: "Nakhon Pathom",
    local: 1.22,
    empate: 5,
    visita: 10,
    marcador1Tiempo: "2-0",
    marcadorFinal: "3-1"
  },
  {
    equipoLocal: "FK Laci",
    equipoVisita: "FK Skenderbeu Korce",
    local: 1.25,
    empate: 4.5,
    visita: 11,
    marcador1Tiempo: "0-0",
    marcadorFinal: "0-0"
  },
];


