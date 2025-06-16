async function search() {
  let input = document.getElementById('searchInput').value.trim();
  const category = document.getElementById('category').value;

  if (!input) return alert("Escribe algo para buscar");


  const words = input.replace(/[¿?¡!.,]/g, "").split(" ").filter(w => w.length > 2); //Borra todos los caracteres especiales para obtener la palabra clave

  if (words.length === 0) return alert("No se detectó ninguna palabra clave");

  const keyword = words[words.length - 1];

  try {
    const response = await fetch(`/search/${category}?q=${encodeURIComponent(keyword)}`);
    const data = await response.json();
    displayResults(data, category);
  } catch (error) {
    console.error("Search error:", error);
  }
}

  
  function displayResults(data, category) {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';
  
    
  
    data.forEach((item, index) => {
    const id = item._id;
    const card = document.createElement('div');
    card.className = 'card';

  let content = `
    <h3>${item.nombre || item.evento || item.titulo || 'Sin título'}</h3>
    <p>${item.descripcion || 'Sin descripción disponible'}</p>
    <button class="editar-btn" data-category="${category}" data-id="${id}" data-index="${index}">Editar</button>
    <div id="editForm-${index}" style="display:none; margin-top: 10px;">
      <input type="text" id="edit-nombre-${index}" value="${item.nombre || ''}" placeholder="Nuevo nombre"/><br>
      <textarea id="edit-desc-${index}" rows="3" placeholder="Nueva descripción">${item.descripcion || ''}</textarea><br>
      <button onclick="submitEdit('${category}', '${id}', ${index})">Guardar</button>
      <button onclick="cancelEdit(${index})">Cancelar</button>
    </div>
  `;

  card.innerHTML = content;
  container.appendChild(card);
  
  const botonEditar = card.querySelector('.editar-btn');
  botonEditar.addEventListener('click', function () {
    const cat = this.dataset.category;
    const elId = this.dataset.id;
    const i = parseInt(this.dataset.index);
    showEditForm(cat, elId, i);
  });
});} 

  
  function showEditForm(category, id, index) {
    document.getElementById(`editForm-${index}`).style.display = 'block';
  }
  
  function cancelEdit(index) {
    document.getElementById(`editForm-${index}`).style.display = 'none';
  }
  
  async function submitEdit(category, id, index) {
    const nuevoNombre = document.getElementById(`edit-nombre-${index}`).value;
    const nuevaDesc = document.getElementById(`edit-desc-${index}`).value;
  
    const data = {
      nombre: nuevoNombre,
      descripcion: nuevaDesc
    };
  
    try {
      const response = await fetch(`/editar/${category}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        alert('Elemento actualizado');
        search(); //fokin refresh
      } else {
        alert('Error al actualizar');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión');
    }
  }
  async function agregarNuevo() {
  const categoria = document.getElementById('newCategory').value;
  const nombre = document.getElementById('newNombre').value;
  const descripcion = document.getElementById('newDescripcion').value;

  const data = { nombre, descripcion };

  try {
    const response = await fetch(`/agregar/${categoria}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Nuevo elemento agregado correctamente");
      search(); // recargar resultados
    } else {
      alert("Error al agregar el elemento");
    }
  } catch (err) {
    console.error(err);
    alert("Error de red al agregar");
  }
}

  
  
  