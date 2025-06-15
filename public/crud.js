async function search() {
  const query = document.getElementById('searchInput').value;
  const category = document.getElementById('category').value;
  
  try {
      const response = await fetch(`http://localhost:3000/search/${category}?q=${encodeURIComponent(query)}`);
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
      console.log('item._id:', item._id);
      console.log('item._id?.$oid:', item._id?.$oid);
  
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
    
      });
  };
  
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
  
  
  