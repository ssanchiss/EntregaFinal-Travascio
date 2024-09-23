document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://api.auravant.com/api';
    const token = ' NO TENGO TOKEN'; 

 




    document.getElementById('obtener-rodeos').addEventListener('click', async () => {
        try {
            const response = await fetch(`${apiUrl}/livestock/herd`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Error al obtener rodeos');
            
            const data = await response.json();
            setTimeout(() => {
                mostrarRodeos(data);
            }, 2000); 
        } catch (error) {
            console.error('Error al obtener rodeos:', error);
        }
    });

  





    document.getElementById('crear-rodeo').addEventListener('click', async () => {
        try {
            const nuevoRodeo = {
                type_id: 1, 
                animal_count: 5,
                paddock_uuid: "bf74402d-4721-49f9-8328-7313b02b4dfc", 
                weight: 1200,
                weight_unit: "Kg",
                herd_name: "Nuevo Rodeo",
                field_id: 258388
            };

            const response = await fetch(`${apiUrl}/livestock/herd`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoRodeo)
            });

            if (!response.ok) throw new Error('Error al crear rodeo');
            
            const data = await response.json();
            alert('Rodeo creado exitosamente');
            console.log(data);
        } catch (error) {
            console.error('Error al crear rodeo:', error);
        }
    });
});

function mostrarRodeos(data) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ''; 

    data.data.forEach(rodeo => {
        const rodeoInfo = `
            <div class="rodeo">
                <h3>Nombre: ${rodeo.herd_name}</h3>
                <p>Peso: ${rodeo.weight} ${rodeo.weight_unit}</p>
                <p>Cantidad de Animales: ${rodeo.animal_count}</p>
            </div>
        `;
        resultadoDiv.innerHTML += rodeoInfo;
    });

    document.getElementById('sonido-rodeo').play();
}
