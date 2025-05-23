document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll('.checkbox-producto');

  // Restaurar lista de productos seleccionados desde localStorage
  let productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];

  checkboxes.forEach(checkbox => {
    const id = checkbox.dataset.id;
    const nombre = checkbox.dataset.nombre;
    const imagen = checkbox.dataset.imagen;

    // Restaurar estado del checkbox si fue seleccionado previamente
    const estadoGuardado = localStorage.getItem(`${id}_seleccionado`);
    if (estadoGuardado === 'true') {
      checkbox.checked = true;
    }

    // Evento cuando el checkbox cambia
    checkbox.addEventListener('change', () => {
      const seleccionado = checkbox.checked;
      localStorage.setItem(`${id}_seleccionado`, seleccionado);

      // Si está seleccionado, agregar a la lista (si no existe ya)
      if (seleccionado) {
        if (!productosSeleccionados.some(p => p.id === id)) {
          productosSeleccionados.push({ id, nombre, imagen });
        }
      } else {
        // Si se desmarca, eliminar de la lista
        productosSeleccionados = productosSeleccionados.filter(p => p.id !== id);
      }

      // Guardar la lista actualizada
      localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
      console.log(productosSeleccionados);
    });
  });
});
