function identificarCafeClassico(ingredientesIds, cafesClassicos) {
  const ordenado = ingredientesIds.sort().join(',');
  return cafesClassicos.find(cafe => {
    const cafeIds = cafe.ingredientes.map(i => i.ingredienteId).sort().join(',');
    return cafeIds === ordenado;
  });
}

export { identificarCafeClassico };